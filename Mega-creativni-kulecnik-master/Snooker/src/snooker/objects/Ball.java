/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package snooker.objects;

import java.util.Arrays;
import javafx.scene.shape.Circle;

/**
 *
 * @author martin
 */
public class Ball {

    private Circle bounds;
    private double[] center;
    private Force force;
    Vector v;

    public Ball(Circle bounds, Vector v, double weight) {
        this.bounds = bounds;
        this.v = v;
//        center[0] = bounds.getCenterX();
//        center[1] = bounds.getCenterY();
//        radius = bounds.getRadius();
        force = new Force(weight, v);
    }

    public void setForce(Force force) {
        this.force = force;
    }

    public void setV(Vector v) {
        this.v = v;
    }

    public Ball(double[] center, double radius, Vector v, double weight) {
        this.v = v;
//        this.center = center;
//        this.radius = radius;
        bounds = new Circle(center[0], center[1], radius);
        force = new Force(weight, v);
    }

    public Circle getBounds() {
        return bounds;
    }

    public void setCenter(double[] center) {
        bounds.setCenterX(center[0]);
        bounds.setCenterY(center[1]);
    }

    public double[] getCenter() {
        return new double[]{bounds.getCenterX(), bounds.getCenterY()};
    }

    public double getmoveX(){
        return v.getMove()[0];
    }
    
    public double getmoveY(){
        return v.getMove()[1];
    }

    
    public void fetchMove() {
        double[] move = v.getMove();
        double[] temp = getCenter();
        setCenter(new double[]{temp[0] + move[0], temp[1] + move[1]});
    }
}
