package tum.de.osm.gevt;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;



/**
 * @brief  responsible for loading database connection parameters  from properties file & 
 *  Connect Application with Postgresql DB
 *  
 * @author Ali
 */
public class InitializeResources {
	
	static Properties prop = new Properties();
	static String dbHost;
	static int dbPort;
	static String dbUser;
	static String dbPassword;
	static String dbName;
	static InputStream inputStream = null;
	static String propFileName="dbconfig.properties";
	
	
	public void connectDB() throws IOException {
		String path = this.getClass().getClassLoader().getResource("").getPath();
		String fullPath = URLDecoder.decode(path, "UTF-8");
		String pathArr[] = fullPath.split("/WEB-INF/classes/");
		System.out.println(fullPath);
		System.out.println(pathArr[0]);
		fullPath = pathArr[0];

		String reponsePath = "";
		// to read a file from webcontent
		reponsePath = new File(fullPath).getPath() + File.separatorChar + "dbconfig.properties";
		inputStream = new FileInputStream(reponsePath);
		prop.load(inputStream);

		dbHost = prop.getProperty("dbhost");
		dbPort = Integer.parseInt(prop.getProperty("dbport"));
		dbUser = prop.getProperty("dbuser");
		dbPassword = prop.getProperty("dbpassword");
		dbName = prop.getProperty("dbname");
		System.out.println(dbHost);
		System.out.println(dbPort);
		System.out.println(dbUser);
		System.out.println(dbPassword);
		System.out.println(dbName);

	}
	
		
    public Connection getConnection() {
        Connection conn = null;
        String connString= "jdbc:postgresql://" + "localhost" + ":" + 5432 + "/" + "myosmdb";
        try {        	
        	Class.forName("org.postgresql.Driver");  
        	 System.out.println(connString);
        	conn = DriverManager.getConnection(connString,"ali","root" );
                System.out.println("connection sucesfull "+ connString);
        } catch (Exception e) {            
            e.printStackTrace();            
        }        
        return conn;       
    } //end of getConnection()
 
} 
