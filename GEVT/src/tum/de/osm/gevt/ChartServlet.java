package tum.de.osm.gevt;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
@WebServlet("/ChartGenerator")
public class  ChartServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public ChartServlet() {
		super();
	}


	protected void doProcess(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException{

		String json=null;
		//response.setContentType("application/json");
		System.out.println("in do process");
		// Outer bounding box attributes
		String minLat = request.getParameter("minLat");
		String maxLat = request.getParameter("maxLat");
		String minLong = request.getParameter("minLong");
		String maxLong = request.getParameter("maxLong");
		String fromDate = request.getParameter("startDate");
		String toDate = request.getParameter("endDate");

		String outerQuery = outerBoundingBoxQuery(fromDate, toDate, minLat, maxLat, minLong, maxLong);

		String xAxisChart = request.getParameter("xChartValues");
		String yAxisChart = request.getParameter("yChartValues");
		String zAxisChart = request.getParameter("zChartValues");

		String result1=null,result2=null,result3=null;

		if(xAxisChart != ""){
			result1 = prepareChartData(request,outerQuery);
		}
		if(yAxisChart != ""){
			result2 = prepareChartData(request,outerQuery);
		}
		if(zAxisChart != ""){
			result3 = prepareChartData(request,outerQuery);
		}

		StringBuilder jsonResult = new StringBuilder();

		jsonResult.append("[");
		if (result1 == null){
			jsonResult.append("{ \"xAxis\" : ").append("[").append(result1).append("]}").append(",");
		}else{
			jsonResult.append("{ \"xAxis\" : ").append(result1).append("},");
		}
		if (result2 == null){
			jsonResult.append("{ \"yAxis\" : ").append("[").append(result2).append("]}").append(",");
		}else{
			jsonResult.append("{ \"yAxis\" : ").append(result2).append("},");
		}
		if (result3 == null){
			jsonResult.append("{ \"zAxis\" : ").append("[").append(result3).append("]}");
		}else{
			jsonResult.append("{ \"zAxis\" : ").append(result3).append("}");
		}

		jsonResult.append("]");
		System.out.println("json result = " + jsonResult);
		response.getWriter().write(jsonResult.toString());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException{

		doProcess(request,response);
	}


	private String prepareChartData(HttpServletRequest request, String outerQuery){

		// for noofevents axis
		String noOfEventsCat = request.getParameter("noOfEventsCat").trim();
		String noOfEventsSubCat = request.getParameter("noOfEventsSubCat").trim();

		// for noofparticipants axis
		String noOfPartCat = request.getParameter("noOfPartCat").trim();
		String noOfPartSubCat = request.getParameter("noOfPartSubCat").trim();

		//for time axis
		String time = request.getParameter("timeSelection").trim();
		//for space axis
		String space = request.getParameter("spaceSelection").trim();
		// for catSubcat axis
		String catSubCat = request.getParameter("catSubCatCat").trim();


		String result = null;

		if (noOfPartCat.equals("noOfPartCat") || noOfPartSubCat.equals("noOfPartSubCat") ){
			result = noOfParticipantsQuery(request,outerQuery);
		}else if(noOfEventsCat.equals("noOfEventsCat") || noOfEventsSubCat.equals("noOfEventsSubCat") || catSubCat.equals("catSubCatCat")){
			result = noOfEventsQuery(request,outerQuery);
		}else if (time.equals("timeSelection") || space.equals("space") ){
			result = timeQuery(request, outerQuery);
		}

		return result;		
	}

	private String noOfParticipantsQuery(HttpServletRequest request, String outerQuery) {
		String category = request.getParameter("noOfPartCat").replace(",", "','");
		String subcategory = request.getParameter("noOfPartSubCat").replace(",", "','");
		StringBuilder query = new StringBuilder("select  category, num_participants  FROM  ").append(outerQuery);
		StringBuilder queryWithSubCat = new StringBuilder("select  category,subcategory, num_participants  FROM  ").append(outerQuery);

		StringBuilder groupBY =new StringBuilder(" group by category,startdate order by category asc");
		StringBuilder groupBYSubCat =new StringBuilder(" group by category,subcategory order by category asc");

		if ((!category.equals("") && !subcategory.equals(""))){// && !time.equals("") ){
			query.append(" where category IN ('").append(category).append("')").
			append(" AND subcategory IN ('").append(subcategory).append("')").
			append(groupBYSubCat);
			return executeParcipantsQueryWithSubCat(queryWithSubCat.toString());

		}else if (!category.equals("") &&  subcategory.equals("") ){//&& time.equals("")){
			query.append(" where category IN ('").append(category).append("')").
			append(groupBY);
			return executeParcipantsQuery(query.toString());
		}
		return null;
	}


	private String executeParcipantsQueryWithSubCat(String query) {
		InitializeResources connectionManager=null;Statement stmt = null;
		Connection conn=null;ResultSet rs;  String json=null;
		List<EventInfoBean> tempList = null;

		try{ 
			tempList = new ArrayList<EventInfoBean>();
			connectionManager = new InitializeResources();
			conn=  connectionManager.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(query);

			try {
				while (rs.next()) {

					String category = rs.getString("category");
					String subcategory = rs.getString("subcategory");
					String noOfParticipants = rs.getString("noOfParticipants");
					tempList.add(new EventInfoBean(category,subcategory,noOfParticipants));

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
		json = gson.toJson(tempList);
		System.out.println(tempList.size());
		return json;
	}


	public String noOfEventsQuery(HttpServletRequest request, String outerQuery){
		StringBuilder query = new StringBuilder("select  category, count(name) as noOfEvents  FROM  ").append(outerQuery);
		StringBuilder queryWithSubCat = new StringBuilder("select  category, count(name) as noOfEvents,subcategory  FROM  ").append(outerQuery);
		StringBuilder groupBY =new StringBuilder(" group by category order by category asc");
		StringBuilder groupBYSubCat =new StringBuilder(" group by category,subcategory order by category asc");
		String category = request.getParameter("noOfEventsCat").replace(",", "','");
		String subcategory = request.getParameter("noOfEventsSubCat").replace(",", "','");

		if ((!category.equals("") && !subcategory.equals(""))){ //&& !time.equals("") ){
			queryWithSubCat.append(" where category IN ('").append(category).append("')").
			append(" AND subcategory IN ('").append(subcategory).append("')");
			queryWithSubCat.append(groupBYSubCat);
			return executeNoOfEventsQueryWithSubCat(query.toString());
		}else if (!category.equals("") &&  subcategory.equals("")){ //&& time.equals("")){
			query.append(" where category IN ('").append(category).append("')");
			query.append(groupBY);
			return executeNoOfEventsQuery(query.toString());
		}
		return null;
	}


	private String executeNoOfEventsQueryWithSubCat(String query) {
		InitializeResources connectionManager=null;
		Statement stmt = null;
		Connection conn=null;
		ResultSet rs;
		String json=null;
		int noOfEvents=0;
		List<EventInfoBean> finalList = null;
		try{ 
			connectionManager = new InitializeResources();
			conn=  connectionManager.getConnection();
			stmt = conn.createStatement();
			System.out.println(query);
			rs = stmt.executeQuery(query);

			try {
				finalList = new ArrayList<EventInfoBean>();
				while (rs.next()) {
					String category = rs.getString("category");
					String subcategory = rs.getString("subcategory");
					noOfEvents = rs.getInt("noOfEvents");
					finalList.add(new EventInfoBean(category,subcategory,noOfEvents));
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
		System.out.println("data rows "+finalList.size());
		return json;

	}


	public String timeQuery(HttpServletRequest request, String outerQuery){

		StringBuilder query = new StringBuilder("select  category, subcategory, count(name) as noOfEvents,startdate, ").
				append(" num_participants,latitude as latitude,longitude as longitude FROM ").append(outerQuery);
		StringBuilder groupBY =new StringBuilder(" group by category,subcategory,startdate,num_participants,latitude,longitude order by category asc");

		query.append(groupBY);

		return executeTimeQuery(query.toString());
	}



	/**
	 * every chart data will be select from this inner query
	 * */	
	private String outerBoundingBoxQuery(String toDate, String fromDate,String minLat, String maxLat,
			String minLong, String maxLong){
		StringBuilder query = null;
		try{
			query = new StringBuilder();
			query.append(" ( select * from search_event  where startdate  between ").
			append("'").append(toDate).append("'").append(" AND ").append("'").append(fromDate).append("'").
			append(" AND ").
			append("latitude between ").append(minLat).append(" * 10000000 AND ").append(maxLat).append(" * 10000000").
			append(" AND ").append("longitude between ").append(minLong).append(" * 10000000 AND ").append(maxLong).append(" * 10000000").
			append(" order by startdate asc ) as subquery ");

		}catch(Exception e){
			e.printStackTrace();
		}
		System.out.println("Outer bounding box query "+ query);
		return query.toString();
	}


	/**
	 * @brief prepares data for all pie and bar charts in json format 
	 */
	public String executeNoOfEventsQuery(String query){

		InitializeResources connectionManager=null;
		Statement stmt = null;
		Connection conn=null;
		ResultSet rs;
		String json=null;
		int noOfEvents=0;
		List<EventInfoBean> finalList = null;
		try{ 
			connectionManager = new InitializeResources();
			conn=  connectionManager.getConnection();
			stmt = conn.createStatement();
			System.out.println(query);
			rs = stmt.executeQuery(query);

			try {
				finalList = new ArrayList<EventInfoBean>();
				while (rs.next()) {
					String category = rs.getString("category");
					noOfEvents = rs.getInt("noOfEvents");
					finalList.add(new EventInfoBean(category,noOfEvents));
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
		System.out.println("data rows "+finalList.size());
		return json;
	}



	/**
	 * @brief prepares data for all pie and bar charts in json format 
	 */
	public String executeParcipantsQuery(String query){

		InitializeResources connectionManager=null;Statement stmt = null;
		Connection conn=null;ResultSet rs;  String json=null;
		List<EventInfoBean> tempList = null;

		try{ 
			tempList = new ArrayList<EventInfoBean>();
			connectionManager = new InitializeResources();
			conn=  connectionManager.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(query);

			try {
				while (rs.next()) {

					String category = rs.getString("category");
					String noOfParticipants = rs.getString("noOfParticipants");
					tempList.add(new EventInfoBean(category,noOfParticipants));

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
		json = gson.toJson(tempList);
		System.out.println(tempList.size());
		return json;
	}

	/**
	 * @brief prepares data for all pie and bar charts in json format 
	 */
	public String executeTimeQuery(String query){

		InitializeResources connectionManager=null;Statement stmt = null;
		Connection conn=null;ResultSet rs;  String json=null;
		List<EventInfoBean> tempList = null;

		try{ 
			tempList = new ArrayList<EventInfoBean>();
			connectionManager = new InitializeResources();
			conn=  connectionManager.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(query);

			try {
				while (rs.next()) {

					String category = rs.getString("category");
					String subcategory = rs.getString("subcategory");
					int noOfEvents = rs.getInt("noOfEvents");
					String noOfParticipants = rs.getString("num_participants");
					String time = rs.getString("startdate");
					Double latitude = rs.getDouble("latitude");
					Double longitude = rs.getDouble("longitude");

					tempList.add(new EventInfoBean(category,noOfEvents,noOfParticipants,time,latitude,longitude,subcategory));

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
		json = gson.toJson(tempList);
		System.out.println(tempList.size());
		return json;
	}
}