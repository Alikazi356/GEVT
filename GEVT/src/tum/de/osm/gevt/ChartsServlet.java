package tum.de.osm.gevt;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;



/**
 *  @brief servlet to prepare data in json format for all charts 
 * @author ali
 */
@WebServlet("/ChartsGenerator")
public class  ChartsServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public ChartsServlet() {
		super();
	}



	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException{

		String json=null;
		String monthsForQuery=null;
		String query = null;
		response.setContentType("application/json");

		// Outer bounding box query will be identified from request
		/*	String outerBoundary = request.getParameter("outerBoundary");

		if (outerBoundary != null){
			String minLat = request.getParameter("minLat");
			String maxLat = request.getParameter("maxLat");
			String minLong = request.getParameter("minLon");
			String maxLong = request.getParameter("maxLon");
			String fromDate = request.getParameter("fromDate");
			String toDate = request.getParameter("toDate");

			json =	boundingBoxQuery( minLat,  maxLat,  minLong,  maxLong,fromDate,  toDate);

			System.out.println("Outer boundary data has been submitted!");
		}*/

		// for inner boundary of charts
		//	else{
		String chartType = request.getParameter("chartType");
		String filteredYear = request.getParameter("year");
		String category = request.getParameter("category");
		String season = request.getParameter("selectedSeason");
		String months = request.getParameter("selectedMonths");
		String yaxis = request.getParameter("yAxis");

		//open when client is integarted
/*		String minLat = request.getParameter("minLat");
		String maxLat = request.getParameter("maxLat");
		String minLong = request.getParameter("minLon");
		String maxLong = request.getParameter("maxLon");*/
		
		if( !season.equals("")){
			monthsForQuery = getMonthsFromSeason(season);

		}else{
			monthsForQuery = months;
		}

		String minLat="48.1500009";
		String maxLat = "48.2655561";
		String minLong = "11.5699360";
		String maxLong = "11.6709992";

		//generating pie chart 2d and 3d, bar chart 2d and 3d
		if ( chartType.equals("barChart3d") && yaxis.equals("noOfEvents") &&   filteredYear != null   ){ 
			//query =  noOfEventsQuery(filteredYear,monthsForQuery);
			query =  noOfEventsQuery(filteredYear,monthsForQuery,minLat,maxLat,minLong,maxLong);
			json =  pieAndBarWithNoOfEvents(query);
		}else if ( chartType.equals("barChart3d") && yaxis.equals("noOfParticipants") &&   filteredYear != null ){
			//query = noOfParticipantsQuery(filteredYear, monthsForQuery);
			query = noOfParticipantsQuery(filteredYear, monthsForQuery,minLat,maxLat,minLong,maxLong);
			json =  pieAndBarWithNoOfParticipants(query);
		
		}
		
		// generate spline, spline area, scatter chart
		if (chartType.equals("spline") &&  yaxis.equals("noOfEvents") ){
			//query = noOfEventsQuerySpline("2012",category,monthsForQuery);
			query = noOfEventsQuerySpline("2012",category,monthsForQuery,minLat,maxLat,minLong,maxLong);
			json = generateSplineChartWithNoofEvents(query,"2012");
		}else if( chartType.equals("spline") &&  yaxis.equals("noOfParticipants") ){
			//query = noOfParticipantsQuerySpline("2012",category,monthsForQuery);
			query = noOfParticipantsQuerySpline("2012",category,monthsForQuery,minLat,maxLat,minLong,maxLong);
			json = generateSplineChartWithNoofParticipants(query,"2012");
		}

		System.out.println(json);
		response.getWriter().write(json);

		//String yaxis="noOfevents";
		//	getCategoriesForBoundingBox(session);
		//	eventYears(session);


		//	String test="2012,january,febrauary";
		//String test1="2012,winter";


		//	monthsForQuery = getMonthsFromSeason("season");


		//generating pie chart 2d and 3d, bar chart 2d and 3d
		/*	if ( chartType.equals("barChart3d") &&  filteredYear != null   ){ 
			json =  pieAndBarChartGenerator(filteredYear,monthsForQuery);
		}
		 */

		//	  Gson gson = new Gson();
		//	  json = gson.toJson(chartsData);

	}


	private String noOfParticipantsQuerySpline(String filteredYear,
			String category, String monthsForQuery,String minLat, String maxLat,String minLong, String maxLong) {
		StringBuilder query = null;

		try{
			query = new StringBuilder();

			if (filteredYear != null && category == "" && !monthsForQuery.equals("0,0,0,0,0,0,0,0,0,0,0,0,0")   ){
				
				query.append("select  category , num_participants  FROM search_event ");
				query.append(" where extract(year from startdate)  = "  ).append(filteredYear).append("  AND ")
				.append("  extract(month from startdate) IN   ( " ).append(monthsForQuery).append(")").
				append(" AND latitude between ").append(minLat).append(" * 10000000 ").append(" AND ").append(maxLat).
				append(" * 10000000 ").append(" AND longitude between  ").append(minLong).append(" * 10000000 ").	
				append(" AND ").append(maxLong).append(" * 10000000 ").
				append(" ORDER BY extract(year from startdate)  asc ");
			//	append(" group by category, extract(year from startdate) ORDER BY extract(year from startdate)  asc ");
			
			}else if (filteredYear != null   && monthsForQuery.equals("0,0,0,0,0,0,0,0,0,0,0,0,0") && category == "" ){
				query.append("select  category , num_participants  FROM search_event ");
				query.append(" where extract(year from startdate)  = "  ).append(filteredYear).
				append(" AND latitude between ").append(minLat).append(" * 10000000 ").append(" AND ").append(maxLat).
				append(" * 10000000 ").append(" AND longitude between  ").append(minLong).append(" * 10000000 ").	
				append(" AND ").append(maxLong).append(" * 10000000 ").
				append(" group by category, extract(year from startdate) ORDER BY extract(year from startdate)  asc ");
			
			}
			else if (filteredYear != null && category != null  && monthsForQuery.equals("0,0,0,0,0,0,0,0,0,0,0,0,0") ){
				query.append("select  category , num_participants  FROM search_event ");
				query.append(" where extract(year from startdate)  = "  ).append(filteredYear).
				append(" AND category = '").append(category).append("' ").
				append(" AND latitude between ").append(minLat).append(" * 10000000 ").append(" AND ").append(maxLat).
				append(" * 10000000 ").append(" AND longitude between  ").append(minLong).append(" * 10000000 ").	
				append(" AND ").append(maxLong).append(" * 10000000 ").
				append(" group by category, extract(year from startdate) ORDER BY extract(year from startdate)  asc ");
			
			}

		}catch(Exception e){
			e.printStackTrace();
		}
		return query.toString();
	}



	private String noOfEventsQuerySpline(String filteredYear, String category,
				String monthsForQuery,String minLat, String maxLat,String minLong, String maxLong) {
		StringBuilder query = null;

		try{
			query = new StringBuilder();

			if (filteredYear != null && category == "" && !monthsForQuery.equals("0,0,0,0,0,0,0,0,0,0,0,0,0")   ){
				
				query.append("select  category , count(name) as noOfEvents  FROM search_event ");
				query.append(" where extract(year from startdate)  = "  ).append(filteredYear).append("  AND ")
				.append("  extract(month from startdate) IN   ( " ).append(monthsForQuery).append(")").
				append(" AND latitude between ").append(minLat).append(" * 10000000 ").append(" AND ").append(maxLat).
				append(" * 10000000 ").append(" AND longitude between  ").append(minLong).append(" * 10000000 ").	
				append(" AND ").append(maxLong).append(" * 10000000 ").
				append(" group by category, extract(year from startdate) ORDER BY extract(year from startdate)  asc ");

			}else if (filteredYear != null   && monthsForQuery.equals("0,0,0,0,0,0,0,0,0,0,0,0,0") && category == "" ){
				query.append("select  category , count(name) as noOfEvents  FROM search_event ");
				query.append(" where extract(year from startdate)  = "  ).append(filteredYear).
				append(" AND latitude between ").append(minLat).append(" * 10000000 ").append(" AND ").append(maxLat).
				append(" * 10000000 ").append(" AND longitude between  ").append(minLong).append(" * 10000000 ").	
				append(" AND ").append(maxLong).append(" * 10000000 ").
				append(" group by category, extract(year from startdate) ORDER BY extract(year from startdate)  asc ");

			}
			else if (filteredYear != null && category != null  && monthsForQuery.equals("0,0,0,0,0,0,0,0,0,0,0,0,0") ){
				query.append("select  category , count(name) as noOfEvents  FROM search_event ");
				query.append(" where extract(year from startdate)  = "  ).append(filteredYear).
				append(" AND category = '").append(category).append("' ").
				append(" AND latitude between ").append(minLat).append(" * 10000000 ").append(" AND ").append(maxLat).
				append(" * 10000000 ").append(" AND longitude between  ").append(minLong).append(" * 10000000 ").	
				append(" AND ").append(maxLong).append(" * 10000000 ").
				append(" group by category, extract(year from startdate) ORDER BY extract(year from startdate)  asc ");

			}else if (filteredYear != null && !category.equals("")  && !monthsForQuery.equals("0,0,0,0,0,0,0,0,0,0,0,0,0") ){
				query.append("select  category , count(name) as noOfEvents  FROM search_event ");
				query.append(" where extract(year from startdate)  = "  ).append(filteredYear).
				append(" AND latitude between ").append(minLat).append(" * 10000000 ").append(" AND ").append(maxLat).
				append(" * 10000000 ").append(" AND longitude between  ").append(minLong).append(" * 10000000 ").	
				append(" AND ").append(maxLong).append(" * 10000000 ").
				append(" group by category, extract(year from startdate) ORDER BY extract(year from startdate)  asc ");
			}

		}catch(Exception e){
			e.printStackTrace();
		}
		return query.toString();


	}



	public String getMonthsFromSeason(String requestString) {
		String months;
		//summer = 6,7,8, winter=10,11,12,1,2 autumn9  spring3,4,5
		switch (requestString) {
		case "winter":
			months = "10,11,12,1,2";
			break;
		case "summer":
			months = "6,7,8";
		case "autumn":
			months = "9";
		case "spring":
			months = "3,4,5";
			break;
		default:
			throw new IllegalArgumentException("Invalid season of the year: " + requestString);
		}
		return months;
	}


	public String noOfEventsQuery(String year,String months,String minLat, String maxLat,
									String minLong, String maxLong){

		StringBuilder query = null;

		try{

			query = new StringBuilder();

			query.append("select  category , count(name) as noOfEvents  FROM search_event ");

			if (year != null && months == null  ){

				query.append(" where extract(year from startdate)  = "  ).append(year).
				append(" group by category order by category asc ");

			}else if (year != null && months != null ){
				query.append(" where extract(year from startdate)  = "  ).append(year).append("  AND ")
				.append("  extract(month from startdate) IN   ( " ).append(months).append(")").
				append(" AND  latitude between ").append(minLat).append(" * 10000000 ").append(" AND ").append(maxLat).
				append(" * 10000000 ").append(" AND longitude between  ").append(minLong).append(" * 10000000 ").	
				append(" AND ").append(maxLong).append(" * 10000000 ").
				append(" group by category order by category asc ");
			}

		}catch(Exception e){
			e.printStackTrace();
		}
		return query.toString();
	}


	public String noOfParticipantsQuery(String year,String months,String minLat, String maxLat,
										String minLong, String maxLong){

		StringBuilder query = null;

		try{

			query = new StringBuilder();

			query.append("select  category , num_participants  FROM search_event ");

			if (year != null && months == null  ){

				query.append(" where extract(year from startdate)  = "  ).append(year).
				append(" group by category,num_participants order by category asc ");

			}else if (year != null && months != null ){
				query.append(" where extract(year from startdate)  = "  ).append(year).append("  AND ")
				.append("  extract(month from startdate) IN   ( " ).append(months).append(")").
				append(" AND num_participants != '' ").
				append(" AND latitude between ").append(minLat).append(" * 10000000 ").append(" AND ").append(maxLat).
				append(" * 10000000 ").append(" AND longitude between  ").append(minLong).append(" * 10000000 ").	
				append(" AND ").append(maxLong).append(" * 10000000 ").
				append(" group by category,num_participants order by category asc ");
			}

		}catch(Exception e){
			e.printStackTrace();
		}
		return query.toString();
	}



	/**
	 * @brief prepares data for all pie and bar charts in json format 
	 */

	public String pieAndBarWithNoOfEvents(String query){
	
		InitializeResources connectionManager=null;
		Statement stmt = null;
		EventInfoBean eventInfoBean = null;
		List<EventInfoBean> chartsDataList = null;
		Connection conn=null;
		ResultSet rs;
		String json=null;
		int yAxisData=0;
		List<EventInfoBean> finalList = null;
		try{ 
			connectionManager = new InitializeResources();
			chartsDataList = new ArrayList<EventInfoBean>();
			conn=  connectionManager.getConnection();
			stmt = conn.createStatement();
			System.out.println(query);
			rs = stmt.executeQuery(query);

			try {
				finalList = new ArrayList<EventInfoBean>();
				while (rs.next()) {

					String category = rs.getString("category");
					yAxisData = rs.getInt("noOfEvents");

					//finalList.add(new EventInfoBean(category,yAxisData));

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
		json = gson.toJson(finalList);
		System.out.println(json);
		return json;
	}


	public String pieAndBarWithNoOfParticipants(String query){
		
		InitializeResources connectionManager=null;
		Statement stmt = null;
		EventInfoBean eventInfoBean = null;
		List<EventInfoBean> chartsDataList = null;
		Connection conn=null;
		ResultSet rs;
		String json=null;
		LinkedHashSet<String> uniqueCategroies = null;
		int yAxisData=0;
		List<EventInfoBean> finalList = null;
		try{ 
			connectionManager = new InitializeResources();
			chartsDataList = new ArrayList<EventInfoBean>();
			uniqueCategroies = new LinkedHashSet<String>();
			conn=  connectionManager.getConnection();
			stmt = conn.createStatement();
			System.out.println(query);
			rs = stmt.executeQuery(query);

			try {
				while (rs.next()) {

					String category = rs.getString("category");
					yAxisData = parseNoOfParticipants(rs.getString("num_participants"));

				//	eventInfoBean = new EventInfoBean(category,yAxisData);
					uniqueCategroies.add(category);
					chartsDataList.add(eventInfoBean);


				}//end of while()
				System.out.println("list size "+chartsDataList.size());
				finalList = new ArrayList<EventInfoBean>();
				// counting no of participants for a year
				int countParticipants=0;
				String category =null;
				// create an iterator
				Iterator iterator = uniqueCategroies.iterator(); 
				// check values
				while (iterator.hasNext()){
					category = iterator.next().toString();
					for ( EventInfoBean e : chartsDataList){
						if (category.equals(e.getCategory())){
							countParticipants = countParticipants + e.getyAxisData();
						}

						//  finalList.add(new EventInfoBean(category,Double.valueOf(countParticipants)));
					}
					System.out.println("Catgory "+ category + "nofoparticaipants "+ countParticipants);
				//	finalList.add(new EventInfoBean(category,countParticipants));

					countParticipants = 0;

				}

			} finally {              		 
				rs.close();              		 
			}

		}catch(Exception e){
			e.printStackTrace();
		}
		Gson gson = new Gson();
		// convert java object to JSON format,
		// and returned as JSON formatted string
		json = gson.toJson(finalList);
		System.out.println(json);
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

	/*	public String pieAndBarChartGenerator(String year){
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
	}*/


	/**
	 * @brief prepares data for spline and scatter chart in json format
	 * 
	 * */
	private String generateSplineChartWithNoofEvents(String query, String year) {
		
		InitializeResources connectionManager=null;
		Statement stmt = null;
		Connection conn=null;
		ResultSet rs;
		List<EventInfoBean> chartsDataList = null;
		//	StringBuilder query;
		String json=null;
		try{ 
			connectionManager = new InitializeResources();
			chartsDataList = new ArrayList<EventInfoBean>();
			//	query = new StringBuilder();
			/*
			if(category.equals("")){
				query.append("select count(name) as noOfEvents, extract(year from startdate) as year, category").
				append("  FROM search_event ").
				append(" GROUP BY category, extract(year from startdate) ORDER BY extract(year from startdate)  asc;");  
			}else{
				query.append("select count(name) as noOfEvents, extract(year from startdate) as year, category").
				append("  FROM search_event where category='").append(category).append("'").
				append(" GROUP BY category, extract(year from startdate) ORDER BY extract(year from startdate)  asc;");        		
			}*/

			conn=  connectionManager.getConnection();
			stmt = conn.createStatement();
			System.out.println(query.toString());
			rs = stmt.executeQuery(query);

			try {
				while (rs.next()) {

					int noOfEvents = rs.getInt("noOfEvents");
					// year = rs.getString("year");
					String cat = rs.getString("category");

					chartsDataList.add(new EventInfoBean(cat,noOfEvents,year));
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

	private String generateSplineChartWithNoofParticipants(String query, String yearHardCoded) {
		
		InitializeResources connectionManager=null;
		Statement stmt = null;Connection conn=null;ResultSet rs;
		LinkedHashSet<String> uniqueCategroies = null;
		List<EventInfoBean> finalList = null;
		List<EventInfoBean> chartsDataList = null;
		
		String json=null;String cat = null;	int noOfParticipants=0;
	
		try{ 
			connectionManager = new InitializeResources();
			chartsDataList = new ArrayList<EventInfoBean>();
			finalList = new ArrayList<EventInfoBean>();
			uniqueCategroies = new LinkedHashSet<String>();
			conn=  connectionManager.getConnection();
			stmt = conn.createStatement();
			System.out.println(query.toString());
			rs = stmt.executeQuery(query);

			try {
				while (rs.next()) {

					noOfParticipants = parseNoOfParticipants(rs.getString("num_participants"));
					//eventYear = rs.getString("year");
					cat = rs.getString("category");
					
					uniqueCategroies.add(cat);

					chartsDataList.add(new EventInfoBean(cat,noOfParticipants,yearHardCoded));

				}//end of while()
				System.out.println("list size "+chartsDataList.size());

				int countParticipants=0;
				String category =null;
				String year=null;
				// create an iterator
				Iterator iterator = uniqueCategroies.iterator(); 
				// check values
				while (iterator.hasNext()){
					category = iterator.next().toString();
					for ( EventInfoBean e : chartsDataList){
						if (category.equals(e.getCategory())){
							//countParticipants = countParticipants + e.getyAxisData();
							countParticipants = countParticipants + e.getNoOfEvents();
						}

					  
					}
					finalList.add(new EventInfoBean(category,countParticipants,yearHardCoded));
					System.out.println("Catgory "+ category + "nofoparticaipants "+ countParticipants);
					//  finalList.add(new EventInfoBean(category,countParticipants));

					countParticipants = 0;


					Gson gson = new Gson();
					// convert java object to JSON formatand returned as JSON formatted string
					json = gson.toJson(finalList);
					//System.out.println(json);
				} 
			}finally {              		 
				rs.close();              		 
			}

		}catch(Exception e){
			e.printStackTrace();

		}
		return json;


	}

/*	public List<String> getCategoriesInnerBoundingBox(){
		Statement stmt = null;
		Connection conn=null;
		ResultSet rs;
		StringBuilder query;
		List<String> categories=null;
		InitializeResources connectionManager=null;
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

		finally{
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return categories;
		//session.setAttribute("boundingBoxCategories", categories);
	}

	public List<String> eventYearsForInnerBoundingBox(){
		Statement stmt = null;
		Connection conn=null;
		ResultSet rs;
		StringBuilder query;
		List<String> years=null;
		InitializeResources connectionManager = null;
		try{ 
			
			connectionManager = new InitializeResources();
			query = new StringBuilder();
			query.append(" SELECT DISTINCT extract(year from startdate) as year  ").
			append( " FROM search_event  where startdate is not NULL order by year asc "  );

			conn = connectionManager.getConnection();
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

		}finally{
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return years;
		//session.setAttribute("boundingBoxYears", years);
	}*/

	/**
	 * @brief quering db to create view which will contain subset of data defined within bounding box
		and next time when user will query for results, the results will taken from view
	 */
	/*public String boundingBoxQuery(String minLat, String maxLat, String minLong, String maxLong, 
			String fromDate, String toDate, String userId){

		

		Statement stmt = null;
		Connection conn=null;
		ResultSet rs;
		StringBuilder query = null;
		StringBuilder makeView = null;
		String json = null;
		InitializeResources connectionManager = null;

		try{ 
			connectionManager = new InitializeResources();
			query = new StringBuilder();
			makeView = new StringBuilder();
			System.out.println(query);
			conn=  connectionManager.getConnection();
			stmt = conn.createStatement();

			//stmt.execute(" DROP VIEW IF EXISTS search_event  ");


			
			//pass here bounding box data to create bounding box
			//	makeView.append("create view search_event as (").append("select * from search_event")
			//.append(");");
			makeView.append("create view search_event as (").append("select * from search_event where " ).
			append(" latitude between ").append(minLat).append(" * 10000000 ").append(" AND ").append(maxLat).
			append(" * 10000000 ").append(" AND longitude between  ").append(minLong).append(" * 10000000 ").	
			append(" AND ").append(maxLong).append(" * 10000000 ").
			append(" AND startdate  between '").
			append(fromDate).append("' AND '").append(toDate).append("'").
			append(");");
			
			makeView.append("create table search_event_table_").append(userId).append(" as (").append("select * from search_event where " ).
			append(" latitude between ").append(minLat).append(" * 10000000 ").append(" AND ").append(maxLat).
			append(" * 10000000 ").append(" AND longitude between  ").append(minLong).append(" * 10000000 ").	
			append(" AND ").append(maxLong).append(" * 10000000 ").
			append(" AND startdate  between '").
			append(fromDate).append("' AND '").append(toDate).append("'").
			append(");");

			stmt.execute(makeView.toString());

			//user query for getting results from bounding box
			//	query.append("SELECT * FROM search_event");

				stmt.executeUpdate("create view search_event as (select * from search_event);");
			    		stmt.executeUpdate("SELECT * FROM search_event");
			 	rs = stmt.executeQuery(query.toString());
			    		try {
			    			while (rs.next()) {
			    				double latitudeResult = rs.getDouble("latitude");
			    				double longitudeResult = rs.getDouble("longitude");
			    				eventInfoList.add(new EventInfoBean(latitudeResult,longitudeResult));
			    			} //end of while()	    			
			    		} finally {              		 
			    			rs.close();              		 
			    		}

		}catch(Exception e){
			e.printStackTrace();

		}


			getCategoriesInnerBoundingBox();
		eventYearsForInnerBoundingBox();

		List<String> list = new ArrayList<String>();
		list.addAll(getCategoriesInnerBoundingBox());
		list.add("$$$");
		list.addAll(eventYearsForInnerBoundingBox());
		Gson gson = new Gson();
		// convert java object to JSON format,
		// and returned as JSON formatted string
		json = gson.toJson(list);

		System.out.println(" view created " + json);
		return json;
	}
*/
}
