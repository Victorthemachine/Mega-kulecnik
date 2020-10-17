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
    private Force force;

    public Ball(Circle bounds) {
        this.bounds = bounds;
        center[0] = bounds.getCenterX();
        center[1] = bounds.getCenterY();
        radius = bounds.getRadius();
        double[] temp = {bounds.getCenterX(), bounds.getCenterY()};
        force = new Force(1, new Vector(temp));
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

    public void setCenter(double[] center) {
        this.center = center;
    }

    public double[] getCenter() {
        return center;
    }
    
    public void fetchMove(Vector apply) {
/*        double[] temp = force.getCurrentForce(apply);
        double[] returnTemp = {temp[0], temp[1]};
        setCenter(returnTemp);*/
        double[] temp = getCenter();
        setCenter(new double[]{temp[0] + 25, temp[1] + 25});
    }
}
