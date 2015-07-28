package tum.de.osm.gevt;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;



/**
 *  @brief servlet to prepare data in json format for pie distribution visualize on map
 * @author ali
 */
@WebServlet("/DistributionServlet")
public class  PieDistributionServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public PieDistributionServlet() {
		super();
	}
	
	
	
	protected void doProcess(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException{
		
		String json=null;
		response.setContentType("application/json");
		System.out.println("in do process");
		// Outer bounding box attributes
	
	/*	String minLat = request.getParameter("minLat");
		String maxLat = request.getParameter("maxLat");
		String minLong = request.getParameter("minLon");
		String maxLong = request.getParameter("maxLon");
		String fromDate = request.getParameter("fromDate");
		String toDate = request.getParameter("toDate");
		String category = request.getParameter("category").replace(",", "','");
		String subcategory = request.getParameter("subcategory").replace(",", "','");*/
		String pieMapQueryType = request.getParameter("pieMapQueryType");
	
		
	/*	String minLat="48.1500009";
		String maxLat = "48.2655561";
		String minLong = "11.5699360";
		String maxLong = "11.6709992";
		String fromDate="1-1-2012";
		String toDate = "1-1-2014";
		String category ="";
		String subcategory ="";
		String fullBoundingBox="true";
	*/	//String pieMapQueryType = null;
		
		
		switch (pieMapQueryType) {
		case "flagOnlyBoundingBox": //pie chart
			json = flagOnlyBoundingBox(request);
			break;
		case "flagOnlyDates":
			json = flagOnlyDates(request);
			break;
		case "flagOnlyCats":
			json = flagOnlyCats(request);
			break;
		case "flagOneCatAndSubCats":
			json = flagOneCatAndSubCats(request);
			break;
		case "flagBoundingBoxAndDates":
			json = flagBoundingBoxAndDates(request);
			break;	
		case "flagBoundingBoxAndCats":
			json = flagBoundingBoxAndCats(request);
			break;
		case "flagBoundingBoxAndOneCatAndSubCats":
			json = flagBoundingBoxAndOneCatAndSubCats(request);
			break;
		case "flagDatesAndCats":
			json = flagDatesAndCats(request);
			break;	
		case "flagDatesAndOneCatAndSubCats":
			json = flagDatesAndOneCatAndSubCats(request);
			break;
		case "flagBoundingBoxAndDatesAndCats":
			json = flagBoundingBoxAndDatesAndCats(request);
			break;
		case "flagBoundingBoxAndDatesAndOneCatAndSubCats":
			json = flagBoundingBoxAndDatesAndOneCatAndSubCats(request);
			break;		
		default:
			throw new IllegalArgumentException("Invalid Pie Map Query Type : " + pieMapQueryType);
		}
		
		
	//	makeQuery( minLat, maxLat, minLong, maxLong, fromDate, toDate, category,subcategory,fullBoundingBox );
		
		
		System.out.println(json);
		response.getWriter().write(json);
	}
	
	private String flagBoundingBoxAndDatesAndOneCatAndSubCats(HttpServletRequest request) {
		StringBuilder query=null;
		String json = null;
		String minLat = request.getParameter("minLatPie");
		String maxLat = request.getParameter("maxLatPie");
		String minLong = request.getParameter("minLonPie");
		String maxLong = request.getParameter("maxLonPie");
		String fromDate = request.getParameter("startDate");
		String toDate = request.getParameter("endDate");
		String category = request.getParameter("category").replace(",", "','");
		String subcategory = request.getParameter("subcategory").replace(",", "','");
		try{
			query = new StringBuilder();
			query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude,").
			append(" category, count(subcategory) as noOfEvents,subcategory FROM search_event").
			append(" where latitude between ").append(minLat).append(" * 10000000 AND ").
			append(maxLat).append(" * 10000000").append(" AND ").append("longitude between ").
			append(minLong).append(" * 10000000 AND ").append(maxLong).append(" * 10000000").
			append( " AND startdate between   '").append(fromDate).append("'").
    		append(" AND '").append(toDate).append("'").
    		append(" AND category in ('").append(category).append("')").
    		append(" and subcategory in ('").append(subcategory).append("')").
    		append(" group by latitude,longitude ,category,subcategory order by category asc");

			json = executeDistributionQuery(query.toString());

		}catch(Exception e){
			e.printStackTrace();
		}

		return json;
	}



	private String flagBoundingBoxAndDatesAndCats(HttpServletRequest request) {
		StringBuilder query=null;
		String json = null;
		String minLat = request.getParameter("minLatPie");
		String maxLat = request.getParameter("maxLatPie");
		String minLong = request.getParameter("minLonPie");
		String maxLong = request.getParameter("maxLonPie");
		String fromDate = request.getParameter("startDate");
		String toDate = request.getParameter("endDate");
		String category = request.getParameter("category").replace(",", "','");
		try{
			query = new StringBuilder();
			query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude,").
			append(" category, count(category) as noOfEvents,subcategory FROM search_event").
			append(" where latitude between ").append(minLat).append(" * 10000000 AND ").
			append(maxLat).append(" * 10000000").append(" AND ").append("longitude between ").
			append(minLong).append(" * 10000000 AND ").append(maxLong).append(" * 10000000").
			append( " AND startdate between   '").append(fromDate).append("'").
    		append(" AND '").append(toDate).append("'").
    		append(" AND category in ('").append(category).append("')").
    		append(" group by latitude,longitude ,category,subcategory order by category asc");

			json = executeDistributionQuery(query.toString());

		}catch(Exception e){
			e.printStackTrace();
		}

		return json;	
		
	}



	private String flagDatesAndOneCatAndSubCats(HttpServletRequest request) {
		StringBuilder query=null;
		String json = null;
		String fromDate = request.getParameter("startDate");
		String toDate = request.getParameter("endDate");
		String category = request.getParameter("category").replace(",", "','");
		String subcategory = request.getParameter("subcategory").replace(",", "','");
		try{
			query = new StringBuilder();
			query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude,").
			append(" category, count(subcategory) as noOfEvents,subcategory FROM search_event").
			append(" where startdate between '").append(fromDate).append("'").
			append(" AND '").append(toDate).append("'").
			append(" AND category in ('").append(category).append("')").
			append(" and subcategory in '").append(subcategory).append("'").
			append(" group by latitude,longitude ,category,subcategory order by category asc");

			json = executeDistributionQuery(query.toString());

		}catch(Exception e){
			e.printStackTrace();
		}

		return json;
	}


	private String flagDatesAndCats(HttpServletRequest request) {
		StringBuilder query=null;
		String json = null;
		String fromDate = request.getParameter("startDate");
		String toDate = request.getParameter("endDate");
		String category = request.getParameter("category").replace(",", "','");
		
		try{
			query = new StringBuilder();
			query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude,").
			append(" category, count(category) as noOfEvents,subcategory FROM search_event").
			append(" where startdate between '").append(fromDate).append("'").
			append(" AND '").append(toDate).append("'").
			append(" AND category in ('").append(category).append("')").
			append(" group by latitude,longitude ,category,subcategory order by category asc");

			json = executeDistributionQuery(query.toString());

		}catch(Exception e){
			e.printStackTrace();
		}

		return json;
	}


	private String flagBoundingBoxAndOneCatAndSubCats(HttpServletRequest request) {
		StringBuilder query=null;
		String json = null;
		String minLat = request.getParameter("minLatPie");
		String maxLat = request.getParameter("maxLatPie");
		String minLong = request.getParameter("minLonPie");
		String maxLong = request.getParameter("maxLonPie");
		String category = request.getParameter("category").replace(",", "','");
		String subcategory = request.getParameter("subcategory").replace(",", "','");
		
		try{
			query = new StringBuilder();
			query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude,").
			append(" category, count(subcategory) as noOfEvents,subcategory FROM search_event").
			append(" where latitude between ").append(minLat).append(" * 10000000 AND ").
			append(maxLat).append(" * 10000000").append(" AND ").append("longitude between ").
			append(minLong).append(" * 10000000 AND ").append(maxLong).append(" * 10000000").
			append(" and category in ('").append(category).append("')").
			append(" and subcategory in ('").append(subcategory).append("')").
    		append(" group by latitude,longitude ,category,subcategory order by category asc");

			json = executeDistributionQuery(query.toString());

		}catch(Exception e){
			e.printStackTrace();
		}

		return json;
	}


	private String flagBoundingBoxAndCats(HttpServletRequest request) {
		StringBuilder query=null;
		String json = null;
		String minLat = request.getParameter("minLatPie");
		String maxLat = request.getParameter("maxLatPie");
		String minLong = request.getParameter("minLonPie");
		String maxLong = request.getParameter("maxLonPie");
		String category = request.getParameter("category").replace(",", "','");
		
		try{
			query = new StringBuilder();
			query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude,").
			append(" category, count(category) as noOfEvents,subcategory FROM search_event").
			append(" where latitude between ").append(minLat).append(" * 10000000 AND ").
			append(maxLat).append(" * 10000000").append(" AND ").append("longitude between ").
			append(minLong).append(" * 10000000 AND ").append(maxLong).append(" * 10000000").
			append(" and category in ('").append(category).append("')").
    		append(" group by latitude,longitude ,category,subcategory order by category asc");

			json = executeDistributionQuery(query.toString());

		}catch(Exception e){
			e.printStackTrace();
		}

		return json;
	}


	private String flagBoundingBoxAndDates(HttpServletRequest request) {
		StringBuilder query=null;
		String json = null;
		String minLat = request.getParameter("minLatPie");
		String maxLat = request.getParameter("maxLatPie");
		String minLong = request.getParameter("minLonPie");
		String maxLong = request.getParameter("maxLonPie");
		String fromDate = request.getParameter("startDate");
		String toDate = request.getParameter("endDate");
		try{
			query = new StringBuilder();
			query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude,").
			append(" category, count(category) as noOfEvents,subcategory FROM search_event").
			append(" where latitude between ").append(minLat).append(" * 10000000 AND ").
			append(maxLat).append(" * 10000000").append(" AND ").append("longitude between ").
			append(minLong).append(" * 10000000 AND ").append(maxLong).append(" * 10000000").
			append( " AND startdate between   '").append(fromDate).append("'").
    		append(" AND '").append(toDate).append("'").
    		append(" group by latitude,longitude ,category,subcategory order by category asc");

			json = executeDistributionQuery(query.toString());

		}catch(Exception e){
			e.printStackTrace();
		}

		return json;
	}


	private String flagOneCatAndSubCats(HttpServletRequest request) {
		StringBuilder query=null;
		String json = null;
		String category = request.getParameter("category").replace(",", "','");
		String subcategory = request.getParameter("subcategory").replace(",", "','");
		try{
			query = new StringBuilder();
			query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude,").
			append(" category, count(subcategory) as noOfEvents,subcategory FROM search_event").
			append(" where category in ('").append(category).append("')").
			append(" and subcategory in ('").append(subcategory).append("')").
			append(" group by latitude,longitude ,category,subcategory order by category asc");

			json = executeDistributionQuery(query.toString());

		}catch(Exception e){
			e.printStackTrace();
		}

		return json;
	}


	private String flagOnlyCats(HttpServletRequest request) {
		StringBuilder query=null;
		String json = null;
		String category = request.getParameter("category").replace(",", "','");
		System.out.println("from request "+ category);
		try{
			query = new StringBuilder();
			query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude,").
			append(" category, count(category) as noOfEvents,subcategory FROM search_event").
			append(" where category in ('").append(category).append("')").
			append(" group by latitude,longitude ,category,subcategory order by category asc");

			json = executeDistributionQuery(query.toString());

		}catch(Exception e){
			e.printStackTrace();
		}

		return json;
	}

	private String flagOnlyDates(HttpServletRequest request) {
		StringBuilder query=null;
		String json = null;
		String fromDate = request.getParameter("startDate");
		String toDate = request.getParameter("endDate");
		try{
			query = new StringBuilder();
			query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude,").
			append(" category, count(category) as noOfEvents,subcategory FROM search_event").
			append(" where startdate between '").append(fromDate).append("'").
			append(" AND '").append(toDate).append("'").
			append(" group by latitude,longitude ,category,subcategory order by category asc");

			json = executeDistributionQuery(query.toString());

		}catch(Exception e){
			e.printStackTrace();
		}

		return json;
	}


	private String flagOnlyBoundingBox(HttpServletRequest request) {
		StringBuilder query=null;
		String json = null;
		String minLat = request.getParameter("minLatPie");
		String maxLat = request.getParameter("maxLatPie");
		String minLong = request.getParameter("minLonPie");
		String maxLong = request.getParameter("maxLonPie");
		try{
			query = new StringBuilder();
			query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude,").
			append(" category, count(category) as noOfEvents,subcategory FROM search_event").
			append(" where latitude between ").append(minLat).append(" * 10000000 AND ").
			append(maxLat).append(" * 10000000").append(" AND ").append("longitude between ").
			append(minLong).append(" * 10000000 AND ").append(maxLong).append(" * 10000000").
			append(" group by latitude,longitude ,category,subcategory order by category asc ");
			
			json = executeDistributionQuery(query.toString());
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return json;
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException{

		doProcess(request,response);
	}
	
	/**
	 * @brief prepares data for all pie and bar charts in json format 
	 */
   public String executeDistributionQuery(String query){

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
				   
				   double latitude = rs.getDouble("latitude");
				   double longitude = rs.getDouble("longitude");
				   String category = rs.getString("category");
				   noOfEvents = rs.getInt("noOfEvents");
				   String subcategory = rs.getString("subcategory");
				   finalList.add(new EventInfoBean(latitude,longitude,category,noOfEvents,subcategory));
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
}
