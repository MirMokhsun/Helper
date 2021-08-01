    func renderIndicatorBlock( context: CGContext,
        fixedPosition: CGFloat,
        positions: [CGPoint],
        offset: CGFloat,
        textAlign: NSTextAlignment)
    {
        guard
            let yAxis = self.axis as? YAxis,
            let transformer = self.transformer
            else { return }
        
        var limitLines = yAxis.limitLines //вытянули лимит лайн
        let entries = yAxis.entries // вытянули точки
        let labelTextColor = yAxis.labelTextColor // вытянули цвет текста
        let labelFont = yAxis.labelFont // вытянули размер текста

        if limitLines.count == 0 // проверили что она есть
        {
            return
        }

        let indicatorBlockPosition = CGPoint(x: 0.0, y: 0.0) // создали точку начала отрисовки индикотора
        indicatorBlockPosition.x = fixedPosition //задали позицию Х
        
        indicatorBlockPosition.y = limitLines[0].getLimit(); //задали позицию Y
        context.setStrokeColor(limitLines[0].lineColor.cgColor) // вытянули цвет линии
        // Paint paint = new Paint();

        // paint.setColor(indicatorBlockColor);
        // paint.setStyle(Paint.Style.FILL);

        let limitFirst = mYAxis.mEntries[1];
        let gradeFirst = positions[1];

        let limitSecond = mYAxis.mEntries[3];
        let gradeSecond = positions[3];

        let limitDifferent = limitSecond - limitFirst;
        let gradeDifferent = gradeFirst - gradeSecond;

        let different = indicatorBlockPosition.y - limitSecond;
        let differentRangeFromZero = ((different * gradeDifferent) / limitDifferent);
        indicatorBlockPosition.y = gradeSecond - differentRangeFromZero; //задали позицию Y

        // mAxisLabelPaint.setColor(Color.BLACK);

        // c.drawRect(positionX - 15, ourRange - 25 + offset, positionX + 200, ourRange + 7 + offset, paint);

        // рисию прямоугольник

        context.beginPath()
        context.move(to: CGPoint(x:fixedPosition-15, y:indicatorBlockPosition.y - 25)) // левая верхняя
        context.addLine(to: CGPoint(x: (x:fixedPosition + 200, y: indicatorBlockPosition.y - 25)) // правая верхняя
        context.addLine(to: CGPoint(x: fixedPosition + 200, y: indicatorBlockPosition+7)) // правая нижняя
        context.addLine(to: CGPoint(x: fixedPosition-15, y: indicatorBlockPosition+7)) // левая нижняя
        context.addLine(to: CGPoint(x:fixedPosition-15, y:indicatorBlockPosition.y - 25)) // замыкающая

        context.closePath()        
        context.fillPath()

        context.setStrokeColor(labelTextColor) // вытянули цвет текста

        ChartUtils.drawText(
            context: context,
            text: limitLines[0].getLimit(),
            point: CGPoint(x: fixedPosition, y: indicatorBlockPosition.y + offset),
            align: textAlign,
            attributes: [NSAttributedString.Key.font: labelFont, NSAttributedString.Key.foregroundColor: labelTextColor])

    }