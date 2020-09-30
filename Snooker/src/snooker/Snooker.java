/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package snooker;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.StrokeLineCap;
import javafx.stage.Stage;
import snooker.objects.Table;

/**
 *
 * @author martin
 */
public class Snooker extends Application {

    private Rectangle rect;
    private Table table;

    @Override
    public void start(Stage stage) throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("./FXMLDocument.fxml"));

        Scene scene = new Scene(root);
        rect = new Rectangle(900, 450, Color.WHITE);
        rect.setStroke(Color.BLACK);
        rect.setStrokeWidth(10);
        rect.setStrokeLineCap(StrokeLineCap.ROUND);
        AnchorPane testPane = new AnchorPane();
        testPane.setStyle("-fx-background-color:white");
        testPane.setPrefSize(1100, 650);
        double[] cords = cords(new Rectangle(testPane.getPrefWidth(), testPane.getPrefHeight()), rect);
        rect.setLayoutX(cords[0]);
        rect.setLayoutY(cords[1]);
        table = new Table(rect);
        System.out.println(table.getBounds() + "\n" + table.getxCord() + " " + rect.getX());
        testPane.getChildren().add(rect);
        Scene test = new Scene(testPane);
        stage.setScene(test);
        stage.setTitle("Snooker");
        stage.show();
    }
    public static double[] cords(Rectangle screen, Rectangle obj) {
        double[] cordinates = {0, 0};
        cordinates[0] = (screen.getWidth() - obj.getWidth())/2;
        System.out.println(cordinates[0]);
        cordinates[1] = (screen.getWidth() - obj.getWidth())/2;
        System.out.println(cordinates[1]);
        return cordinates;
    }
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }

}
