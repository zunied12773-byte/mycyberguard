package src; // MUST be present, as your project expects files in the 'src' package

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.SQLWarning;

public class DBUtil {

    // --- Configuration for a MySQL Database ---
    private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    // Verify the database name, port (3306), and server address (localhost)
    private static final String DB_URL = "jdbc:mysql://localhost:3306/my_cyber_guard_db"; 
    private static final String USER = "your_db_username"; // <-- REPLACE WITH YOUR USERNAME
    private static final String PASS = "your_db_password"; // <-- REPLACE WITH YOUR PASSWORD

    /**
     * Establishes and returns a new database connection.
     * This method is called by the QuizResultDAO to open communication with the DB.
     * @return A new Connection object.
     * @throws SQLException If the connection fails due to driver, credentials, or server being down.
     */
    public static Connection getConnection() throws SQLException {
        try {
            // Load the JDBC driver class. This will throw ClassNotFoundException if the JAR is missing from the classpath
            Class.forName(JDBC_DRIVER);
        } catch (ClassNotFoundException e) {
            // This error indicates the 'mysql-connector-j-X.X.X.jar' is not in the project's Referenced Libraries
            System.err.println("FATAL: MySQL JDBC Driver not found. Check your classpath configuration.");
            throw new SQLException("JDBC Driver Initialization Error", e);
        }
        
        // Attempt to establish the connection using the configured URL, user, and password
        Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
        
        // Optional: Print any SQL warnings
        SQLWarning warning = conn.getWarnings();
        if (warning != null) {
            System.out.println("SQL Warning: " + warning.getMessage());
        }
        
        return conn;
    }
}