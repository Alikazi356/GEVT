/*package tum.de.osm.gevt;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;

public class Ffarighcode {
	
	private String pieChart(HttpServletRequest request, String outerQuery){

		//for time axis
		// time can be months, weeks, days 
		String time = request.getParameter("timeSelection");  //"1,2,3"
		String query=null;

		// for noofevents axis
		String category = "all";//request.getParameter("noOfEventsCat");
		String subcategory = request.getParameter("noOfEventsSubCat");
		
		// for noofparticipants axis
		String noOfPartCat = "all";//request.getParameter("noOfPartCat");
		String noOfPartSubCat ="";// request.getParameter("noOfPartSubCat");

	
		if (category.equals("noOfPartCat") || subcategory.equals("noOfPartSubCat") ){
			query = noOfParticipantsQuery(request,outerQuery);
			if ((!category.equals("") && !subcategory.equals("")) && !time.equals("") ){
				query = eventsAndParcipantsQuery( category, subcategory, time, outerQuery,"num_participants as noOfParticipants");
				return executeEventsAndParcipantsQuery(query,new Integer(5));
			}else if (!noOfPartCat.equals("") ||  !noOfPartSubCat.equals("") && time.equals("")){
				query = eventsAndParcipantsQuery( noOfPartCat, noOfPartSubCat,null, outerQuery,"num_participants as noOfParticipants");
				return executeEventsAndParcipantsQuery(query,"String");
			}else if (noOfPartCat.equals("") ||  noOfPartSubCat.equals("") &&  !time.equals("")){
				query = eventsAndParcipantsQuery( noOfPartCat, noOfPartSubCat,null, outerQuery,"num_participants as noOfParticipants");
				return executeEventsAndParcipantsQuery(query,"String");
			}else if ( noOfPartCat.equals("") ||  noOfPartSubCat.equals("") &&  !time.equals("")){
				query = eventsAndParcipantsQuery( noOfPartCat, noOfPartSubCat,null, outerQuery,"num_participants as noOfParticipants");
				return executeEventsAndParcipantsQuery(query,"String");
			}
		}else if  (category.equals("noOfEventsCat") || subcategory.equals("noOfEventsSubCat") ){
			
			noOfEventsQuery(request,outerQuery);
			if ((!category.equals("") && !subcategory.equals("")) && !time.equals("") ){
				query = eventsAndParcipantsQuery( category, subcategory, time, outerQuery,"count(name) as noOfEvents");
				return executeEventsAndParcipantsQuery(query,new Integer(5));
			}else if (!noOfPartCat.equals("") ||  !noOfPartSubCat.equals("") && time.equals("")){
				query = eventsAndParcipantsQuery( noOfPartCat, noOfPartSubCat,null, outerQuery,"count(name) as noOfEvents");
				return executeEventsAndParcipantsQuery(query,"String");
			}else if (noOfPartCat.equals("") ||  noOfPartSubCat.equals("") &&  !time.equals("")){
				query = eventsAndParcipantsQuery( noOfPartCat, noOfPartSubCat,null, outerQuery,"count(name) as noOfEvents");
				return executeEventsAndParcipantsQuery(query,"String");
			}else if ( noOfPartCat.equals("") ||  noOfPartSubCat.equals("") &&  !time.equals("")){
				query = eventsAndParcipantsQuery( noOfPartCat, noOfPartSubCat,null, outerQuery,"count(name) as noOfEvents");
				return executeEventsAndParcipantsQuery(query,"String");
			}
		}	
		return null;
			
	}
	
	   *//**
	    * @brief when pie and bar chart is based on no of events with Time axis
	    * 
	    * *//*
	   public String noOfEventsQuery(String year,String outerQuery){
		   StringBuilder query = null;
		   try{
			   query = new StringBuilder();
			   query.append("select  category , count(name) as noOfEvents  FROM  ").append(outerQuery).
			   append(" where extract(year from startdate) IN ("  ).append(year).append(")").
			   append(" AND extract(month from startdate) IN ("  ).append(months).append(")").
			   append(" group by category order by category asc ");
		   }catch(Exception e){
			   e.printStackTrace();
		   }
		   return query.toString();
	   }
	
	   *//**
	    * @brief when pie and bar chart is based on no of events or no of participants 
	    * 
	    * *//*
	   public String eventsAndParcipantsQuery(String category,String subcategory,
			   								  String time,String outerQuery, String dbColumn){

		   StringBuilder query = null;
		   try{
			   query = new StringBuilder();
			   query.append("select  category, ").append(dbColumn).append("  FROM  ").append(outerQuery);
			    
			   if (!time.equals("")){
				   
			   }else{
				   if (!category.equals("all")){
					   query.append(" where category IN ("  ).append(category).append(")").
					   append(" AND subcategory IN (").append(subcategory).append(")");
				   }
			   }   
				   query.append(" order by category asc ");
		   }catch(Exception e){
			   e.printStackTrace();
		   }
		   return query.toString();
	   }
	   
	   *//**
		 * @brief prepares data for all pie and bar charts in json format 
		 *//*
	   public String executeEventsAndParcipantsQuery(String query,Object obj){

		   InitializeResources connectionManager=null;Statement stmt = null;
		   Connection conn=null;ResultSet rs;  String json=null;
		   List<EventInfoBean> finalList = null;
		   List<EventInfoBean> tempList = null;
		   
		   try{ 
			   finalList = new ArrayList<EventInfoBean>();
			   tempList = new ArrayList<EventInfoBean>();
			   connectionManager = new InitializeResources();
			   conn=  connectionManager.getConnection();
			   stmt = conn.createStatement();
			   rs = stmt.executeQuery(query);

			   try {
				   while (rs.next()) {
					   
					   String category = rs.getString("category");
					   if (obj  instanceof Integer){
						   int noOfEvents = rs.getInt("noOfEvents");
						   tempList.add(new EventInfoBean(category,noOfEvents));
					   }else if(obj  instanceof String) {
						   String noOfParticipants = rs.getString("noOfParticipants");
						   tempList.add(new EventInfoBean(category,noOfParticipants));
						  
					   }
					   
				   }//end of while()
			   } finally {              		 
				   rs.close();              		 
			   }

		   }catch(Exception e){
			   e.printStackTrace();
		   }
		   Gson gson = new Gson();
		   // convert java object to JSON format,
		   // and returned as JSON formatted string
		   finalList.addAll(tempList);
		   json = gson.toJson(finalList);
		   System.out.println(finalList.size());
		   return json;
	   }
	   

		public  int parseNoOfParticipants(String participants ){
			int returnedParticipants=0;
			try{

				Pattern pattern = Pattern.compile("\\s");
				Matcher matcher = pattern.matcher(participants);
				boolean found = matcher.find();
				participants = participants.trim();
				if (participants.matches("[0-9]+") ){
					returnedParticipants = Integer.parseInt(participants);
					return returnedParticipants;
				}else if (participants.matches("[a-zA-Z ]+")){
					return 0;
				}else if (found && participants.matches("[a-zA-Z0-9 ]+")){
					int lastSpace =  participants.lastIndexOf(" ")+1;
					returnedParticipants = 	Integer.parseInt(participants.substring(lastSpace, participants.length()));
					return returnedParticipants;
				}

			}catch(Exception e){
				e.printStackTrace();
			}
			return 0;
		}
		

			public String pieAndBarChartGenerator(String year){
			connectionManager = new InitializeResources();

			Statement stmt = null;
			Connection conn=null;
			ResultSet rs;
			StringBuffer query;
			String json=null;
			try{ 
				chartsDataList = new ArrayList<EventInfoBean>();
				query = new StringBuffer();
				query.append("select  category , count(name) as noOfEvents  FROM search_event ").
				append(" where extract(year from startdate)  = "  ).append(year).
				append(" group by category order by category asc ");



				conn=  connectionManager.getConnection();
				stmt = conn.createStatement();
				System.out.println(query.toString());
				rs = stmt.executeQuery(query.toString());

				try {
					while (rs.next()) {

						String category = rs.getString("category");
						int noOfEvents = rs.getInt("noOfEvents");

						chartsDataList.add(new EventInfoBean(category,noOfEvents));
					}//end of while()
					System.out.println("list size "+chartsDataList.size());

					Gson gson = new Gson();
					// convert java object to JSON format,
					// and returned as JSON formatted string
					json = gson.toJson(chartsDataList);
					System.out.println(json);
				} finally {              		 
					rs.close();              		 
				}

			}catch(Exception e){
				e.printStackTrace();


			}
			return json;
		}


}
*/