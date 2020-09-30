/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package snooker.objects;

import javafx.scene.shape.Rectangle;

/**
 *
 * @author martin
 */
public class Table {

    double xCord;
    double yCord;
    double width;
    double height;
    Rectangle bounds;

    public Table(double width, double height) {
        this.width = width;
        this.height = height;
        bounds = new Rectangle(width, height);
    }

    public Table(double xCord, double yCord, double width, double height) {
        this.xCord = xCord;
        this.yCord = yCord;
        this.width = width;
        this.height = height;
    }

    public Table(Rectangle rect) {
        this.xCord = rect.getX() == 0 ? rect.getLayoutX() : rect.getX();
        this.yCord = rect.getY() == 0 ? rect.getLayoutY() : rect.getY();
        this.width = rect.getWidth();
        this.height = rect.getHeight();
        bounds = rect;
//        bounds.setX(xCord);
//        bounds.setY(yCord);
    }
    
    public double getxCord() {
        return xCord;
    }

    public double getyCord() {
        return yCord;
    }

    public void setxCord(double xCord) {
        this.xCord = xCord;
        bounds.setX(xCord);
    }

    public void setyCord(double yCord) {
        this.yCord = yCord;
        bounds.setY(yCord);
    }

    public double getHeight() {
        return height;
    }

    public double getWidth() {
        return width;
    }
    
    public Rectangle getBounds() {
        return bounds;
    }

}
