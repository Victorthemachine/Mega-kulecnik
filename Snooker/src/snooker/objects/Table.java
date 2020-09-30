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
    int width;
    int height;
    Rectangle bounds;

    public Table(int width, int height) {
        this.width = width;
        this.height = height;
        bounds = new Rectangle(width, height);
    }

    public Table(int xCord, int yCord, int width, int height) {
        this.xCord = xCord;
        this.yCord = yCord;
        this.width = width;
        this.height = height;
    }

    public Table(Rectangle rect) {
        this.xCord = rect.getX() == 0 ? rect.getLayoutX() : rect.getX();
        this.yCord = rect.getY() == 0 ? rect.getLayoutY() : rect.getY();
        this.width = (int)rect.getWidth();
        this.height = (int)rect.getHeight();
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

    public void setxCord(int xCord) {
        this.xCord = xCord;
        bounds.setX(xCord);
    }

    public void setyCord(int yCord) {
        this.yCord = yCord;
        bounds.setY(yCord);
    }

    public int getHeight() {
        return height;
    }

    public int getWidth() {
        return width;
    }
    
    public Rectangle getBounds() {
        return bounds;
    }

}
