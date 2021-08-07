//
//  PredictionMarkupRenderer.swift
//  Charts
//
//  Created by Leo Osym on 28.04.2021.
//

import Foundation
import CoreGraphics

open class PredictionMarkupRenderer {
    var viewPortHandler: ViewPortHandler
    var predictionMarkup: PredictionMarkup?
    
    init(viewPortHandler: ViewPortHandler, predictionMarkup: PredictionMarkup?) {
        self.viewPortHandler = viewPortHandler
        self.predictionMarkup = predictionMarkup
    }
    
    open func drawPredictionMarkup(context: CGContext, openClosePrediction: [CGPoint],stopLossTakeProfit: [CGPoint] , predictionPoint: CGPoint)
    {
        drawPredictionLines(context: context, openClosePrediction: openClosePrediction,stopLossTakeProfit:stopLossTakeProfit)
        drawBanner(context: context, start: openClosePrediction[0] , end: openClosePrediction[1])
        drawText(context: context, start: openClosePrediction[0])
        if(predictionMarkup?.isExpired ?? false){
            drawExpiredText(context: context, start: openClosePrediction[0])
        }
        drawEllipseWithFlag(context: context, endPoint:  openClosePrediction[1])
    }
    
    func drawPredictionLines(context: CGContext, openClosePrediction: [CGPoint],  stopLossTakeProfit: [CGPoint]){
        drawStartPredictionLine(context: context, startPoint:  openClosePrediction[0])
        drawStopPredictionLine(context: context,  endPoint:  openClosePrediction[1])
        drawTakeProfitLine(   context: context,  start: openClosePrediction[0],   end:  openClosePrediction[1],
           predictionPoint: stopLossTakeProfit[1] )
        drawStopLossLine( context: context,  start: openClosePrediction[0],   end:  openClosePrediction[1],
                          predictionPoint: stopLossTakeProfit[0] )
    }
    
    func drawStartPredictionLine(context: CGContext, startPoint: CGPoint)
    {
        context.saveGState()
        let line = UIBezierPath()
        line.move(to: CGPoint(x: startPoint.x, y:0))
        line.addLine(to: CGPoint(x: startPoint.x, y:200))

        UIColor(red: 0.65, green: 0.65, blue: 0.65, alpha: 1.00).set()
        line.stroke()
        context.restoreGState()
    }
    
    func drawStopPredictionLine(context: CGContext, endPoint: CGPoint)
    {
        context.saveGState()
        let line = UIBezierPath()
        line.move(to: CGPoint(x: endPoint.x, y:0))
        line.addLine(to: CGPoint(x:endPoint.x, y:200))
        UIColor(red: 0.86, green: 0.44, blue: 0.40, alpha: 1.00).set()
        line.stroke()
        context.restoreGState()
    }
    
    func drawStopLossLine(context: CGContext, start: CGPoint, end: CGPoint, predictionPoint: CGPoint){
        context.saveGState()
        let line = UIBezierPath()
        line.move(to: CGPoint(x: start.x, y:predictionPoint.y ))
        line.addLine(to: CGPoint(x: end.x, y:predictionPoint.y ))
        let  dashes: [ CGFloat ] = [ 5.0, 5.0 ]
        line.setLineDash(dashes, count: dashes.count, phase: 0.0)
        UIColor.red.set()
        line.stroke()
        context.restoreGState()
    }
    
    func drawTakeProfitLine(context: CGContext, start: CGPoint, end: CGPoint, predictionPoint: CGPoint){
        context.saveGState()
        let line = UIBezierPath()
        line.move(to: CGPoint(x: start.x, y:predictionPoint.y ))
        line.addLine(to: CGPoint(x: end.x, y:predictionPoint.y ))
        let  dashes: [ CGFloat ] = [ 5.0, 5.0 ]
        line.setLineDash(dashes, count: dashes.count, phase: 0.0)
        UIColor(red: 0.49, green: 0.63, blue: 0.42, alpha: 1.00).set()
        line.stroke()
        context.restoreGState()
    }
    
    func drawBanner(context: CGContext, start: CGPoint, end: CGPoint){
        context.saveGState()
        // TODO use real colors
        let startColor: UIColor = predictionMarkup?.isBuy ?? false ?
            UIColor(red: 0.35, green: 0.73, blue: 0.65, alpha: 1.00) :
            UIColor(red: 0.89, green: 0.48, blue: 0.46, alpha: 1.00)
        // TODO use real colors
        let endColor: UIColor =  predictionMarkup?.isBuy ?? false ?
            UIColor(red: 0.90, green: 0.95, blue: 0.95, alpha: 1.00) :
            UIColor(red: 1.00, green: 0.78, blue: 0.78, alpha: 1.00)
        let colors = [startColor.cgColor, endColor.cgColor]
        let flagWidth = predictionMarkup?.flagWidth ?? 60.0

        let offsetPositionX = CGFloat(flagWidth);
        let bannerWidth = CGFloat(flagWidth/1.75)
        
        let banner = UIBezierPath()
        banner.move(to: CGPoint(x: start.x-CGFloat(offsetPositionX), y: viewPortHandler.chartHeight - 60))
        banner.addLine(to: CGPoint(x: start.x-CGFloat(offsetPositionX), y: viewPortHandler.chartHeight - 32))
        banner.addLine(to: CGPoint(x: end.x, y: viewPortHandler.chartHeight - 32))
        banner.addLine(to: CGPoint(x: end.x, y: viewPortHandler.chartHeight - 60))
        banner.addLine(to: CGPoint(x: start.x-CGFloat(offsetPositionX), y: viewPortHandler.chartHeight - 60))
        banner.close()
        banner.addClip()
        
        let startPoint = CGPoint(x: start.x-CGFloat(offsetPositionX), y: viewPortHandler.chartHeight - 60)
        let endPoint = CGPoint(x: end.x, y: viewPortHandler.chartHeight - 32)
        let colorSpace = CGColorSpaceCreateDeviceRGB()
        let colorLocations: [CGFloat] = [0.0, 1.0]
        let gradient = CGGradient(colorsSpace: colorSpace,
                                             colors: colors as CFArray,
                                          locations: colorLocations)!

        context.drawLinearGradient(gradient,
            start: startPoint,
            end: endPoint,
            options: [CGGradientDrawingOptions(rawValue: 0)])
        
        let predTextContainer = UIBezierPath()
        predTextContainer.move(to: CGPoint(x: start.x-offsetPositionX+3, y: viewPortHandler.chartHeight - 57))
        predTextContainer.addLine(to: CGPoint(x: start.x-offsetPositionX+3
                                              , y: viewPortHandler.chartHeight - 35))
        predTextContainer.addLine(to: CGPoint(x: start.x-offsetPositionX+bannerWidth-15, y: viewPortHandler.chartHeight - 35))
        predTextContainer.addLine(to: CGPoint(x: start.x-offsetPositionX+bannerWidth, y: viewPortHandler.chartHeight - 46))
        predTextContainer.addLine(to: CGPoint(x: start.x-offsetPositionX+bannerWidth-15, y: viewPortHandler.chartHeight - 57))
        predTextContainer.close()
        UIColor.white.setFill()
        predTextContainer.fill()
        predTextContainer.addClip()
        context.restoreGState()
    }
    
    func drawText(context: CGContext, start: CGPoint) {
        let textSize = predictionMarkup?.textSize ?? 16.0
        let flagWidth = predictionMarkup?.flagWidth ?? 60.0
        let font = UIFont.systemFont(ofSize: CGFloat(textSize))
        let text = predictionMarkup?.recommendation ?? ""

        // TODO use real colors
        let textColor: UIColor = predictionMarkup?.isBuy ?? false ?
            UIColor(red: 0.35, green: 0.73, blue: 0.65, alpha: 1.00) :
            UIColor(red: 0.89, green: 0.48, blue: 0.46, alpha: 1.00)
        let string = NSAttributedString(string: text.uppercased(), attributes: [
                NSAttributedString.Key.font: font,
                NSAttributedString.Key.foregroundColor: textColor
        ])
        let offsetPositionX = CGFloat(flagWidth);
        let coords = CGPoint(x: start.x-offsetPositionX+CGFloat(textSize), y: viewPortHandler.chartHeight - 55)
         string.draw(at: coords)
    }
    
    func drawExpiredText(context: CGContext, start: CGPoint) {
        let textSize = predictionMarkup?.textSize ?? 16.0
        let flagWidth = predictionMarkup?.flagWidth ?? 60.0
        let font = UIFont.systemFont(ofSize: CGFloat(textSize))
        let text = predictionMarkup?.expiredText ?? ""
        let textColor: UIColor = UIColor.white
        let string = NSAttributedString(string: text.uppercased(), attributes: [
                NSAttributedString.Key.font: font,
                NSAttributedString.Key.foregroundColor: textColor
        ])
        let offsetPositionX = CGFloat(flagWidth);
        let bannerWidth = CGFloat(flagWidth/1.75)
        let coords = CGPoint(x: start.x-offsetPositionX+bannerWidth+CGFloat(textSize/2), y: viewPortHandler.chartHeight - 55)
         string.draw(at: coords)
    }
    
    func drawEllipseWithFlag(context: CGContext, endPoint: CGPoint){
        
        context.saveGState()
        
        // draw red ellipse
        let circleRadius = CGFloat(14)
        let ellipse = CGRect(x: endPoint.x - circleRadius, y: viewPortHandler.chartHeight - 60, width: circleRadius*2, height: circleRadius*2)
        context.addEllipse(in: ellipse)
        context.setFillColor(UIColor(red: 0.86, green: 0.44, blue: 0.40, alpha: 1.00).cgColor)
        context.setStrokeColor(UIColor(red: 0.86, green: 0.44, blue: 0.40, alpha: 1.00).cgColor)
        context.drawPath(using: .fillStroke)

        // draw stick
        let line = UIBezierPath()
        line.move(to: CGPoint(x: endPoint.x-circleRadius+10, y:viewPortHandler.chartHeight - 58))
        line.addLine(to: CGPoint(x:endPoint.x-circleRadius+10, y:viewPortHandler.chartHeight - 37))
        line.lineWidth = 2
        UIColor.white.set()
        line.stroke()
        
        // draw flag
        let flag = UIBezierPath()
        flag.move(to: CGPoint(x: endPoint.x-circleRadius+12, y: viewPortHandler.chartHeight - 57))
        flag.addLine(to: CGPoint(x: endPoint.x-circleRadius+22, y: viewPortHandler.chartHeight - 50))
        flag.addLine(to: CGPoint(x: endPoint.x-circleRadius+12, y: viewPortHandler.chartHeight - 43))
        flag.close()
        flag.addClip()
        UIColor.white.setFill()
        flag.fill()
        
        context.restoreGState()
    }
}

open class PredictionMarkup {
    open var  isExpired: Bool = false
    open var  isBuy: Bool = false
    open var  recommendation: String = ""
    open var  expiredText: String = ""
    open var  takeProfit: Float = 0.0
    open var  stopLoss: Float = 0.0
    open var  gradientColorActive: Float = 0.0
    open var  gradientColorInactive: Float = 0.0
    open var  takeProfitColor: Float = 0.0
    open var  stopLossColor: Float = 0.0
    open var  openPredictionIndex: Float = 0.0
    open var  closePredictionIndex: Float = 0.0
    open var  flagWidth: Float = 0.0
    open var  textSize: Float = 0.0
    
    @objc init(markup: AnyObject?){
        let isExpired = markup?.object(forKey: "isExpired") as? NSNumber
        let isBuy = markup?.object(forKey: "isBuy") as? NSNumber
        let takeProfit = markup?.object(forKey: "takeProfit") as? NSNumber
        let stopLoss = markup?.object(forKey: "stopLoss") as? NSNumber
        let gradientColorActive = markup?.object(forKey: "gradientColorActive") as? NSNumber
        let gradientColorInactive = markup?.object(forKey: "gradientColorInactive") as? NSNumber
        let takeProfitColor = markup?.object(forKey: "takeProfitColor") as? NSNumber
        let stopLossColor = markup?.object(forKey: "stopLossColor") as? NSNumber
        let openPredictionIndex = markup?.object(forKey: "openPredictionIndex") as? NSNumber
        let closePredictionIndex = markup?.object(forKey: "closePredictionIndex") as? NSNumber
        let flagWidth = markup?.object(forKey: "flagWidth") as? NSNumber
        let textSize = markup?.object(forKey: "textSize") as? NSNumber
        
        self.isExpired = isExpired?.boolValue ?? false
        self.isBuy = isBuy?.boolValue ?? false

        self.takeProfit = takeProfit?.floatValue ?? 0.0
        self.stopLoss = stopLoss?.floatValue ?? 0.0
        self.gradientColorActive = gradientColorActive?.floatValue ?? 0.0
        self.gradientColorInactive = gradientColorInactive?.floatValue ?? 0.0
        self.takeProfitColor = takeProfitColor?.floatValue ?? 0.0
        self.stopLossColor = stopLossColor?.floatValue ?? 0.0
        self.openPredictionIndex = openPredictionIndex?.floatValue ?? 0.0
        self.closePredictionIndex = closePredictionIndex?.floatValue ?? 0.0
        self.flagWidth = flagWidth?.floatValue ?? 0.0
        self.textSize = textSize?.floatValue ?? 0.0
        
        self.recommendation = markup?.object(forKey: "recommendation") as? String ?? ""
        self.expiredText = markup?.object(forKey: "expiredText") as? String ?? ""

    }
}
