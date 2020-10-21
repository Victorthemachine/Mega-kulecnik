/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package snooker;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.animation.Animation;
import javafx.animation.TranslateTransition;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.Shape;
import javafx.scene.shape.StrokeLineCap;
import javafx.stage.Stage;
import javafx.util.Duration;
import snooker.objects.Ball;
import snooker.objects.Table;
import snooker.objects.Vector;

/**
 *
 * @author martin
 */
public class Snooker extends Application {

    private static boolean collision;
    private static Rectangle rect;
    private static Rectangle test;
    private static Table table;
    private static List<Ball> balls;
    private static ScheduledExecutorService exec;
    public static AnchorPane testPane = new AnchorPane();

    @Override
    public void start(Stage stage) throws Exception {
//        Parent root = FXMLLoader.load(getClass().getResource("FXMLDocument.fxml"));
        balls = new ArrayList();
//        Ball white = new Ball(new Circle(0, 0, 50));    // <<< Neprotina
        Ball white = new Ball(new Circle(200, 200, 20), new Vector(0, 0, 15, 15), 1); // <<< Protina
        Ball black = new Ball(new Circle(400, 200, 20), new Vector(15, 0, 0, 15), 1); // <<< Protina
        balls.add(white);
        balls.add(black);
        rect = new Rectangle(900, 450, Color.WHITE);
        test = new Rectangle(900, 450, Color.GREEN);
        test.setStrokeWidth(0);
        rect.setStroke(Color.BROWN);
        rect.setStrokeWidth(75);
        rect.setStrokeLineCap(StrokeLineCap.ROUND);
        testPane.setStyle("-fx-background-color:white");
        testPane.setPrefSize(1100, 650);
        double[] cords = cords(new Rectangle(testPane.getPrefWidth(), testPane.getPrefHeight()), rect);
        rect.setLayoutX(cords[0]);
        rect.setLayoutY(cords[1]);
        test.setLayoutX(cords[0] - rect.getStrokeDashOffset());
        test.setLayoutY(cords[1] - rect.getStrokeDashOffset());
        table = new Table(rect);
        System.out.println(table.getBounds() + "\n" + table.getxCord() + " " + rect.getX());
        testPane.getChildren().addAll(rect, test);
        balls.forEach(b -> {
            testPane.getChildren().add(b.getBounds());
        });
        Scene scenery = new Scene(testPane);
        stage.setScene(scenery);
        stage.setTitle("Snooker");
        stage.show();
//        collisionChacker();
        Updater();
    }

    public static double[] cords(Rectangle screen, Rectangle obj) {
        double[] cordinates = {0, 0};
        cordinates[0] = (screen.getWidth() - obj.getWidth()) / 2;
        System.out.println(cordinates[0]);
        cordinates[1] = (screen.getWidth() - obj.getWidth()) / 2;
        System.out.println(cordinates[1]);
        return cordinates;
    }

    public static void move(Ball b) {
        Platform.runLater(() -> {
            TranslateTransition movement = new TranslateTransition();
            movement.setByX(b.getmoveX());
            movement.setByY(b.getmoveY());
            movement.setDuration(Duration.millis(500));
            movement.setNode(b.getBounds());
            movement.play();
//            while(!collision){
//                
//            }
//            movement.stop();
        }
        );
    }

    public static void Updater() {
        
        balls.forEach(b -> {
            move(b);
        });
    }

    public static void collisionChacker() {
        exec = Executors.newSingleThreadScheduledExecutor();
        exec.scheduleAtFixedRate(() -> {
            checkCollision();
        }, 1, 10, TimeUnit.MILLISECONDS);
    }

    public static boolean checkCollision() {
        balls.forEach(el -> {
//            System.out.println(el.getBounds());
            Shape intersect = Shape.intersect(el.getBounds(), table.getBounds());
            Shape safeIntersect = Shape.intersect(el.getBounds(), test);
            if (intersect.getBoundsInLocal().getWidth() != -1 && safeIntersect.getBoundsInLocal().getWidth() != el.getBounds().getRadius() * 2) {
//                System.out.println(safeIntersect.getBoundsInLocal().getWidth() != el.getBounds().getRadius() * 2);
//                System.out.println(intersect.getBoundsInLocal().getWidth());
//                System.out.println(el.getBounds());
//                System.out.println("Collision!");
                dummyMethod("fuck you lambda");
            }
        });
        if (collision) {
            collision = false;
            return true;
        }
//////        System.out.println("No collision!");
        return false;
    }

    public static void dummyMethod(String wtfIsWrongWithJavaLambdas) {
        collision = true;
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            exec.shutdownNow();
        }));
        launch(args);
    }

}
