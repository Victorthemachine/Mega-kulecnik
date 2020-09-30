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
import javafx.scene.paint.Paint;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.StrokeLineCap;
import javafx.stage.Stage;

/**
 *
 * @author martin
 */
public class Snooker extends Application {

    private Rectangle rect;

    @Override
    public void start(Stage stage) throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("./FXMLDocument.fxml"));

        Scene scene = new Scene(root);
        rect = new Rectangle(900, 450, Color.WHITE);
        rect.setStroke(Color.BLACK);
        rect.setStrokeWidth(10);
        rect.setStrokeLineCap(StrokeLineCap.ROUND);
        AnchorPane testPane = new AnchorPane(rect);
        testPane.setStyle("-fx-background-color:white");
        Scene test = new Scene(testPane);
        stage.setScene(test);
        stage.setTitle("Snooker");
        stage.show();
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }

}
