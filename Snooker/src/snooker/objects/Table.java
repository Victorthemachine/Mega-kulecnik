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

    int xCord;
    int yCord;
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

    public int getxCord() {
        return xCord;
    }

    public int getyCord() {
        return yCord;
    }

    public void setxCord(int xCord) {
        this.xCord = xCord;
    }

    public void setyCord(int yCord) {
        this.yCord = yCord;
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
