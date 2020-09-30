/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package snooker.objects;

import javafx.scene.shape.Circle;

/**
 *
 * @author martin
 */
public class Ball {

    private Circle bounds;
    private double[] center = {0.0, 0.0};
    private double radius;

    public Ball(Circle bounds) {
        this.bounds = bounds;
        center[0] = bounds.getCenterX();
        center[1] = bounds.getCenterY();
        radius = bounds.getRadius();
    }

    public Ball(double[] center, double radius) {
        this.center = center;
        this.radius = radius;
        bounds = new Circle(center[0], center[1], radius);
    }

    public Ball(double radius) {
        this.radius = radius;
        bounds = new Circle(radius);
    }

    public Circle getBounds() {
        return bounds;
    }

    
}
