package tum.de.osm.gevt;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import sun.security.util.Length;

import com.google.gson.Gson;

/**
 *  @brief servlet to return events based on advanced search in json format
 *  it will also genearte a bounding box search criteria based on user preferences 
 * @author ali
 */
@WebServlet("/EventFinder")
public class EventFinder extends HttpServlet {
	
	private InitializeResources connectionManager;
	private String operator;
	
	
	
	
	 public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public EventFinder() {
		 
	//	 eventInfoList = new ArrayList<EventInfoBean>();
		 connectionManager = new InitializeResources();
		 
	}
	 
	 protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			 throws ServletException, IOException 
			 
		  {
		 List<EventInfoBean> eventInfo=null;
		 String finalQuery="";
		 String[] queryArray=null;
		 String[] queryValues=null;
		 String json=null;
		 Gson gson = new Gson();
		 
		 String queryString = request.getParameter("requestQuery");
		 System.out.println("request query "+queryString );
		 //queryString = "1,48.1523917,11.5399513,5,a|3,educational,o|2,event,a|4,2012-09-07,2014-01-01,n|"; 
		 queryArray = queryString.split("\\|");
		 System.out.println(queryArray);

         for (int i=0; i<queryArray.length; i++){
        	 if (queryArray[i].substring(0, 1).equals("1") && queryArray[i] != queryArray[queryArray.length-1]){        		 
        		 queryValues = queryArray[i].split(",");
        		 setOperator(queryValues[queryValues.length-1]);
            	 finalQuery = finalQuery + queryForLatLong(queryValues[1],queryValues[2],queryValues[3]);
        		 
        	 }else if (queryArray[i].substring(0, 1).equals("2") && queryArray[i] != queryArray[queryArray.length-1]){
        		 queryValues =  queryArray[i].split(",");
        		 setOperator(queryValues[queryValues.length-1]);
        		 finalQuery = finalQuery + queryForEventName(queryValues[1]);
        		 
        	 }else if (queryArray[i].substring(0, 1).equals("3") && queryArray[i] != queryArray[queryArray.length-1]){
        		 queryValues =  queryArray[i].split(",");
        		 setOperator(queryValues[queryValues.length-1]);
        		 finalQuery = finalQuery + queryForCategory(queryValues[1]);
        		 
        	 }else if (queryArray[i].substring(0, 1).equals("4") && queryArray[i] != queryArray[queryArray.length-1]){
        		 queryValues = queryArray[i].split(",");
        		 setOperator(queryValues[queryValues.length-1]);
        		 finalQuery = finalQuery + queryForDate(queryValues[1],queryValues[2]);
        	 }
        	 else{
          		 queryValues =  queryArray[i].split(",");
       		 	 if(queryValues[queryValues.length-1].equals("n")){
       		 		setOperator("n");
       		 	 }else{
       		 		setOperator(null);
       		 	 }
          		 

          		 if (queryArray[i].substring(0, 1).equals("1") ){
            		 queryValues =  queryArray[i].split(",");
                	 finalQuery = finalQuery+ queryForLatLong(queryValues[1],queryValues[2],queryValues[3]);      
                	 
            	 }else if (queryArray[i].substring(0, 1).equals("2") ){
            		 queryValues =  queryArray[i].split(",");
            		 finalQuery = finalQuery + queryForEventName(queryValues[1]);
            		 
            	 }else if (queryArray[i].substring(0, 1).equals("3") ){
            		 queryValues =  queryArray[i].split(",");
            		 finalQuery = finalQuery+ queryForCategory(queryValues[1]);
            		 
            	 }else if (queryArray[i].substring(0, 1).equals("4") ){
            		 queryValues =  queryArray[i].split(",");
            		 finalQuery = finalQuery+ queryForDate(queryValues[1],queryValues[2]);
            	 }
        	 }
         }

	    eventInfo =  findEvents(finalQuery);
	    json = gson.toJson(eventInfo);
	    System.out.println(json);
		response.getWriter().write(json);
		 
   }
	 
	 private String queryForDate(String fromDate, String toDate) {
		 StringBuilder str=null;
		 String operator = getOperator();
			
		 try{
			 str = new StringBuilder();
	    		str.append(" select latitude,longitude, category,subcategory,num_participants, related_items,name,url from search_event").
	    		append( " where startdate between '" ).append(fromDate).append("'").
	    		append(" AND ").append("'").append(toDate).append("'");
	   
	    		
	    		if (operator == null){
	    			return str.toString();
	    		}else{
	    			if (operator.equals("a")){
		    			str.append(" INTERSECT ");
		    		}else if (operator.equals("o") ){
		    			str.append(" UNION ");
		    		}else if (operator.equals("n") ){
		    			str.append(" AND " ).append("startdate").append(" NOT IN ").append("('").append(fromDate).
		    			append("' , '" ).append(toDate).append("')");
		    		}	
	    		}
			 
		 }catch(Exception e){
			 e.printStackTrace();
		 }
		return str.toString();
	}

	private String queryForCategory(String category) {
		 StringBuilder str=null;
		 String operator = getOperator();
			
		 try{
			 str = new StringBuilder();
				 str.append(" select latitude,longitude, category, subcategory,num_participants, related_items,name,url from search_event");
					
				if (operator == null){
	 				str.append( " where category='" ).append(category).append("'");
	    			return str.toString();
	    		}else{
	    			if (operator.equals("a")){
	    				str.append( " where category='" ).append(category).append("'");
		    			str.append(" INTERSECT ");
		    		}else if (operator.equals("o") ){
		    			str.append( " where category='" ).append(category).append("'");
		    			str.append(" UNION ");
		    		}else if (operator.equals("n") ){
		    			str.append(" WHERE " ).append("category").append(" NOT IN ").append("('").append(category).append("')");
		    		}	
	    		}
			 
		 }catch(Exception e){
			 e.printStackTrace();
		 }
		return str.toString();
	}
	
	private boolean checkEventInDB(String name){
		Statement stmt = null;
		Connection conn=null;
		ResultSet rs = null;
		boolean isEventExists=false;
		try{
			connectionManager = new InitializeResources();
			System.out.println(name);
			conn=  connectionManager.getConnection();

			stmt = conn.createStatement();
			rs = stmt.executeQuery(" SELECT name FROM search_event where name = '"+name+"'");
			while (rs.next()) {
				String eventName = rs.getString("name");
				if (eventName.equals(null)){
					return isEventExists;
				}else{
					return !isEventExists;
				}
			} //end of while()	    			
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}		
		return isEventExists;
	}		

	private String queryForEventName(String eventName) {
		StringBuilder str=null;
		String operator = getOperator();
		try{
			str = new StringBuilder();
			str.append(" select latitude,longitude, category,subcategory,num_participants,related_items,name,url from search_event");

			if (operator == null){
				str.append( " where name='" ).append(eventName).append("'");
				return str.toString();
			}else{
				if (operator.equals("a")){
					str.append( " where name='" ).append(eventName).append("'");
					str.append(" INTERSECT ");
				}else if (operator.equals("o") ){
					str.append( " where name='" ).append(eventName).append("'");
					str.append(" UNION ");
				}else if (operator.equals("n") ){
					if (checkEventInDB(eventName)){
						str.append(" WHERE " ).append("name").append(" NOT IN ").append("('").append(eventName).append("')");
					}else{
						str.append(" WHERE " ).append("name='").append(eventName).append("'");
					}
				}		
		   }


		}catch(Exception e){
			e.printStackTrace();
		}
		return str.toString();
	}

	private String queryForLatLong(String latitude, String longitude, String distance) {
		 StringBuilder str = null;
		 String operator = getOperator(); 
		 try{			 
			 str = new StringBuilder();
    		 str.append(" select latitude,longitude, category,subcategory,num_participants,related_items,name,url from ( ").
    		 append( "select latitude,longitude,category,subcategory,num_participants,related_items,name,url from search_event ").
    		 append(" where earth_box(ll_to_earth(").append(latitude).append(",").append(longitude).
    		 append(" ), ").append(distance).append(" * 1000 ").append(" ) @> ").
    		 append(" ll_to_earth(latitude/10000000.0, longitude/10000000.0) ) as subquery ").
    		 append(" where earth_distance(ll_to_earth(").append(latitude).append(",").append(longitude).
    		 append(" ), ll_to_earth(subquery.latitude/10000000.0, subquery.longitude/10000000.0))  <= ").
    		 append(distance).append(" *1000 ");
    		
    		 if (operator == null){
    			return str.toString();
    		 }else{
    			if (operator.equals("a")){
	    			str.append(" INTERSECT ");
	    		}else if (operator.equals("o") ){
	    			str.append(" UNION ");
	    		}else if (operator.equals("n") ){
	    			str.append(" AND " ).append("latitude").append(" NOT IN ").append("(").append(latitude).append(")");
	    			str.append(" AND " ).append("longitude").append(" NOT IN ").append("(").append(longitude).append(")");
	    		}	
    		 }			 
		 }catch(Exception e){
			 e.printStackTrace();
		 }
		return str.toString();
	}

	 
	 /**
	  *  @brief quering db to get events based on user long, lat and distance */
	public List<EventInfoBean> findEvents(String query){
		
		connectionManager = new InitializeResources();
	    	Statement stmt = null;
	    	Connection conn=null;
	    	ResultSet rs;
	    	List<EventInfoBean> eventInfoList = null;

	    	try{ 
	    		System.out.println(query);
	    		eventInfoList = new ArrayList<EventInfoBean>();
	    		conn=  connectionManager.getConnection();
	    		stmt = conn.createStatement();
	    		rs = stmt.executeQuery(query);
	    		try {
	    			while (rs.next()) {
	    				double latitudeResult = rs.getDouble("latitude");
	    				double longitudeResult = rs.getDouble("longitude");
	    				String category = rs.getString("category");
	    				String subcategory = rs.getString("subcategory");
	    				String noOfParticipants = rs.getString("num_participants");
	    				String relatedItems = rs.getString("related_items");
	    				String eventName = rs.getString("name");
	    				String url = rs.getString("url");
	    				eventInfoList.add(new EventInfoBean(latitudeResult,longitudeResult,category,subcategory,noOfParticipants,
	    						relatedItems,eventName,url));
	    			} //end of while()	    			
	    		} finally {              		 
	    			rs.close();              		 
	    		}
	    	}catch(Exception e){
	    		e.printStackTrace();

	    	}
	    	System.out.println("NUmber of events "+ eventInfoList.size());
	    	return eventInfoList;
	    }
}
