package tum.de.osm.gevt;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 * @brief servlet run  on server startup and initialize all server resources required for client  
 * @author ali
 */
@WebListener
public class DBConfigListener implements ServletContextListener {

 	
    public void contextInitialized(ServletContextEvent context) {
    	
    	 InitializeResources connectionManager;
    	try {
    		connectionManager = new InitializeResources();
    		//ChartsServlet chartsServlet = new ChartsServlet();
			connectionManager.connectDB();
			List<String> yearsList = eventYears();
			List<String> categories = getCategoriesFromDB();
			context.getServletContext().setAttribute("yearsList", yearsList);     
			context.getServletContext().setAttribute("categories", categories);
	

		}catch(Exception e){
			e.printStackTrace();
			
		}
    }

    public void contextDestroyed(ServletContextEvent arg0) {
    }
    
    
    public List<String> getCategoriesFromDB(){
    	Statement stmt = null;
    	Connection conn=null;
    	ResultSet rs;
    	StringBuilder query;
    	List<String> categories=null;
    	InitializeResources connectionManager=null;;
    	try{ 
    		connectionManager = new InitializeResources(); 
    		query = new StringBuilder();
    		query.append(" select distinct category  from search_event where category!='' ;  ");
    		
    		conn = connectionManager.getConnection();
    		stmt = conn.createStatement();
    		rs = stmt.executeQuery(query.toString());
    		categories = new ArrayList<String>();
    		try {
    			while (rs.next()) {

    				String category = rs.getString("category");
    				categories.add(category);
    			} //end of while()
    			
    		} finally {              		 
    			rs.close();              		 
    		}

    	}catch(Exception e){
    		e.printStackTrace();

    	}
    	return categories;
    }
    
    public List<String> eventYears(){
    	Statement stmt = null;
    	Connection conn=null;
    	ResultSet rs;
    	StringBuilder query;
    	List<String> years=null;
    	InitializeResources coInitializeResources;
    	try{ 
    		coInitializeResources = new InitializeResources();
    		query = new StringBuilder();
    		query.append(" SELECT DISTINCT extract(year from startdate) as year  ").
    		append( " FROM search_event  where startdate is not NULL order by year asc "  );
    		
    		conn = coInitializeResources.getConnection();
    		stmt = conn.createStatement();
    		rs = stmt.executeQuery(query.toString());
    		years = new ArrayList<String>();
    		try {
    			while (rs.next()) {

    				String year = rs.getString("year");
    				years.add(year);
    			} //end of while()
    			
    		} finally {              		 
    			rs.close();              		 
    		}

    	}catch(Exception e){
    		e.printStackTrace();

    	}
    	return years;
    }
    

	
}
