Change librarry
1) In file MPAndroidChart-master\MPChartLib\src\main\java\com\github\mikephil\charting\renderer\YAxisRender.java add method

	private void renderIndicatorBlock(Canvas c, float positionX, float[] positions, float offset, int to) {
       		List<LimitLine> limitLines = mYAxis.getLimitLines();
        	if (limitLines == null || limitLines.size() <= 0)
            	return;

        	float limitIndicatorBlock = limitLines.get(0).getLimit();
        	int indicatorBlockColor = limitLines.get(0).getLineColor();
        	Paint paint = new Paint();

        	paint.setColor(indicatorBlockColor);
        	paint.setStyle(Paint.Style.FILL);

        	float limitFirst = mYAxis.mEntries[1];
        	float gradeFirst = positions[3];

        	float limitSecond = mYAxis.mEntries[3];
        	float gradeSecond = positions[7];

        	float limitDifferent = limitSecond - limitFirst;
        	float gradeDifferent = gradeFirst - gradeSecond;

        	float different = limitIndicatorBlock - limitSecond;
        	float differentRangeFromZero = ((different * gradeDifferent) / limitDifferent);
        	float ourRange = gradeSecond - differentRangeFromZero;

        	mAxisLabelPaint.setColor(Color.BLACK);

        	c.drawRect(positionX - 10, ourRange - 20 + offset, positionX + 80, ourRange + 7 + offset, paint);
        	c.drawText("" + limitIndicatorBlock, positionX - 1, ourRange + offset, mAxisLabelPaint);

    	}
And add change method drawYLabels to

    protected void drawYLabels(Canvas c, float fixedPosition, float[] positions, float offset) {

        final int from = mYAxis.isDrawBottomYLabelEntryEnabled() ? 0 : 1;
        final int to = mYAxis.isDrawTopYLabelEntryEnabled()
                ? mYAxis.mEntryCount
                : (mYAxis.mEntryCount - 1);

        // draw
        for (int i = from; i < to; i++) {

            String text = mYAxis.getFormattedLabel(i);

            c.drawText(text, fixedPosition, positions[i * 2 + 1] + offset, mAxisLabelPaint);

        }


        //draw indicator block
        renderIndicatorBlock(c, fixedPosition, positions, offset, to);
    }

--------------------------------------------------------------------------
Change library settings
1) In foles in MPAndroidChart-master\MPChartLib\src\main\java\com\github\mikephil\charting\animation change all  @RequiresApi(11) to  @RequiresApi(24)
2) Making .jar library in Intellij IDEA and add it to \node_modules\@merryjs\react-native-charts\android\libs
3) In file \node_modules\@merryjs\react-native-charts\android\src\main\java\com\github\wuxudong\rncharts\LineDataExtract.java commit 
        // if (BridgeUtils.validate(config, ReadableType.Number, "circleHoleColor")) {
        //     lineDataSet.setCircleColorHole(config.getInt("circleHoleColor"));
        // }
4) In file \android\app\build.gradle change buildToolsVersion to buildToolsVersion "24.0.0"
	and add to defaultConfig:
        //jackOptions {
            //enabled true
        //}


5) In file \node_modules\@merryjs\react-native-charts\android\build.gradle change 
	 //buildToolsVersion "25.0.2"
	...
	//dependencies {
    		//compile fileTree(dir: 'libs', include: ['*.jar'])
    		//compile 'com.facebook.react:react-native:0.20.+'
	//}

-----------------------------------------------------------------------------
Remove charts jumping

1) In file MPAndroidChart-master\MPChartLib\src\main\java\com\github\mikephil\charting\chart\BarLineChartBase.java change method calculateOffsets()

    @Override
    public void calculateOffsets() {

        if (!mCustomViewPortEnabled) {

            float offsetLeft = 0f, offsetRight = 0f, offsetTop = 0f, offsetBottom = 0f;

            calculateLegendOffsets(mOffsetsBuffer);

            offsetLeft += mOffsetsBuffer.left;
            offsetTop += mOffsetsBuffer.top;
            offsetRight += mOffsetsBuffer.right;
            offsetBottom += mOffsetsBuffer.bottom;

            // offsets for y-labels
            if (mAxisLeft.needsOffset()) {
//                offsetLeft += mAxisLeft.getRequiredWidthSpace(mAxisRendererLeft
//                        .getPaintAxisLabels());
                offsetLeft = 50f;
            }
//
            if (mAxisRight.needsOffset()) {
//                offsetRight += mAxisRight.getRequiredWidthSpace(mAxisRendererRight
//                        .getPaintAxisLabels());
                offsetRight += 90f;
            }

-----------------------------------------------------------------------------
iOS un library Charts change 2 files BarLineChartViewBase and YAxisRenderer


RUN iOS
1) Change sign in project name from . to _
2) npm i
3) drag and drop 2 libs to node_modules - @merryjs and react-native-charts-wrapper
3) npm run eject
4) npm run postinstall
5) cd ./node_modules/react-native && scripts/ios-install-third-party.sh && cd third-party && cd $(ls | grep 'glog' | awk '{print $1}') && ./configure
6) ../../scripts/ios-configure-glog.sh
7) npm run link

open xCode
8) in xcode, in folder 'ios/NAME_YOUR_PROJECT/ open file "NAME_YOUR_PROJECT.xcworcspace"
9) click in xcode on project right button and create file newFile (swift)
10) in "NAME_YOUR_PROJECT-Bridging-Header.h" add
.......
 #import "React/RCTBridge.h"
 #import "React/RCTViewManager.h"
 #import "React/RCTUIManager.h"
 #import "React/UIView+React.h"
 #import "React/RCTBridgeModule.h"
 #import "React/RCTEventDispatcher.h"
 #import "React/RCTEventEmitter.h"
 #import "React/RCTFont.h"
.......

11) go to "node_modules/react-native-charts-wrapper/ios"
12) drag folder "ReactNativeCharts" to the xcode under the addSwiftVersion.swift
13) in xcode click to you project and update Swift Language Version in Build Settings to 4.0
14) go in folder 'libs' drag and drop from ("Charts", "SwiftyJSON")/name.xcodeproj to xcode under the addSwiftVersion.swift
15) in xcode ("Charts", "SwiftyJSON")/Products/name.framework first file only  
16) drag and drop in "Build Phases / Link Binary With Libraries"
17) drag and drop in "General / Embeded Binaries"
18) drag folder "AF-iOS-SDK" in the xcode under the addSwiftVersion.swift
19) in XCode go to BuildPhases-Link Binary With Libraries and drop from AF-iOS-SDK file libAppsFlyerLib.a
19) in XCode go to BuildPhases-Compile Sources and drop from AF-iOS-SDK file AppsFlyerTracker.h
20) in XCode go to BuildPhases-Link Binary With Libraries and pusf batton '+' and add file AdSupport.framework, set Status - Optional insted Required
21) in XCode go to BuildPhases-Link Binary With Libraries and pusf batton '+' and add file iAd.framework, set Status - Optional insted Required
22) run project