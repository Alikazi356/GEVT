package tum.de.osm.gevt;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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
 * Servlet implementation class HeatMapServlet
 */
@WebServlet("/HeatMapGenerator")
public class HeatMapServlet extends HttpServlet {
	
	
	private static final long serialVersionUID = 1L;
	//private InitializeResources connectionManager;
	//private List<EventInfoBean> heatMapDataList;
	
	
    public HeatMapServlet() {
        super();
    }
    
	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			 throws ServletException, IOException 
			 
		  {
		 
		 response.setContentType("application/json");
		 List<EventInfoBean> heatMapObj=null;
		 List<String> analysisCategories = null;
		 List<String> subcategories = null;
		 String dateTo = request.getParameter("dateTo");
		 String dateFrom = request.getParameter("dateFrom");
		 String category = request.getParameter("category");
		 String subCategory = request.getParameter("subCategory");
		 String categoryToFillSubCat = request.getParameter("categoryToFillSubCat");
		 String getAnalysisCategories = request.getParameter("analysisCategories");
		 String fullQuery = request.getParameter("fullQuery");
		 
		 System.out.println(dateTo);
		 System.out.println(dateFrom);
		 System.out.println(category);
		 System.out.println(subCategory);
		 String json=null;
		 Gson gson = new Gson();
		 
		 if (getAnalysisCategories != null){
			 analysisCategories = getAnalysisCategoriesFromDB();
			 json = gson.toJson(analysisCategories);
		 }
	
		 if (categoryToFillSubCat != null){
			 subcategories = getSubCategoriesFromDB(categoryToFillSubCat);
			 json = gson.toJson(subcategories);
		 }
		   
		 if (  ((dateTo != null && dateFrom != null) )
				 || category!= null || subCategory !=null){
			 heatMapObj =  heatMapQuery(dateFrom,dateTo,category,subCategory,fullQuery);
				// convert java object to JSON format,
				// and returned as JSON formatted string
				 json = gson.toJson(heatMapObj);
		 }	
		  
		   //System.out.println("list size "+heatMapObj.size());
			System.out.println(json);
			response.getWriter().write(json);
		  }

	public List<EventInfoBean> heatMapQuery(String toDate, String fromDate, String category, 
			String subcategory, String fullQuery){
	
		    InitializeResources connectionManager=null;
	    	Statement stmt = null;
	    	Connection conn=null;
	    	ResultSet rs;
	    	StringBuilder query;
	    	List<EventInfoBean> heatMapDataList=null;
	    	category = category.replace(",", "','");
	    	subcategory = subcategory.replace(",", "','");
	    	try{ 
	    		connectionManager = new InitializeResources();
	    		heatMapDataList = new ArrayList<EventInfoBean>();
	    		query = new StringBuilder();
	    		query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude FROM search_event where ");
                
	    		if (fullQuery.equals("true")){
	    			query.append(" category in ('").append(category).append("')").
		    		append(" AND subcategory in ('").append(subcategory).append("')").
		    		append( " AND  startdate between  '").append(toDate).append("'").
		    		append(" AND '").append(fromDate).append("'");
	    		}
	    		    		
	    		else if ( category !="" && subcategory !=""){
	 	    		query.append(" category in ('").append(category).append("')").
		    		append(" AND subcategory in ('").append(subcategory).append("')");
	 	    		
	    		}else if ((!toDate.equals("0") && !fromDate.equals("0")) && category !=""){
	 	    		query.append( "   startdate between   '").append(toDate).append("'").
		    		append(" AND '").append(fromDate).append("'").
		    		append(" AND category in ('").append(category).append("')");
	    		
	    		}/*else if ((!toDate.equals("0") && !fromDate.equals("0")) && subcategory !=""){
	    			query.append( "   startdate between   '").append(toDate).append("'").
		    		append(" AND '").append(fromDate).append("'").
		    		append(" AND subcategory = '").append(subcategory).append("'");
	    		}*/
	    		else if (category !=""){ 
	    			query.append("  category IN ('").append(category).append("')");
	    		}
	    		
	        	else if(!toDate.equals("0") && !fromDate.equals("0")){
	    			query.append( "   startdate between '").append(toDate).append("'").
		    		append(" AND '").append(fromDate).append("'");
	    		}
	    		
	    		
	    		System.out.println(query.toString());
	    		conn=  connectionManager.getConnection();
	    		stmt = conn.createStatement();
	    		
	    		
	    		
	    		rs = stmt.executeQuery(query.toString());
	    		try {
	    			while (rs.next()) {
	    				double laitude = rs.getDouble("latitude");
	    				double longitude = rs.getDouble("longitude");
	    		
	    				heatMapDataList.add(new EventInfoBean(laitude,longitude));
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
	    	return heatMapDataList;
	    }
	

	private List<String> getAnalysisCategoriesFromDB() {
		Statement stmt = null;
		Connection conn=null;
		ResultSet rs;
		StringBuilder query;
		List<String> aCategories=null;
		InitializeResources connectionManager=null;
		
		try{ 
			query = new StringBuilder();
			connectionManager = new InitializeResources();
			query.append("   select distinct category from search_event ");
			System.out.println("analysis categories query "+query);
			conn = connectionManager.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(query.toString());
			aCategories = new ArrayList<String>();
			try {
				while (rs.next()) {

					String cats = rs.getString("category");
					aCategories.add(cats);
				} //end of while()

			} finally {              		 
				rs.close();              		 
			}

		}catch(Exception e){
			e.printStackTrace();

		}
		return aCategories;
	}
	
    public List<String> getSubCategoriesFromDB(String category){
    	Statement stmt = null;
    	Connection conn=null;
    	ResultSet rs;
    	StringBuilder query;
    	List<String> subCategories=null;
    	InitializeResources connectionManager=null;
    	try{ 
    		query = new StringBuilder();
    		connectionManager = new InitializeResources();
    		query.append("   select distinct subcategory from search_event where category='").
    		append(category).append("'").append(" and  subcategory != '' ");
    		System.out.println("subcat query "+query);
    		conn = connectionManager.getConnection();
    		stmt = conn.createStatement();
    		rs = stmt.executeQuery(query.toString());
    		subCategories = new ArrayList<String>();
    		try {
    			while (rs.next()) {

    				String subCategory = rs.getString("subcategory");
    				subCategories.add(subCategory);
    			} //end of while()
    			
    		} finally {              		 
    			rs.close();              		 
    		}

    	}catch(Exception e){
    		e.printStackTrace();

    	}
    	return subCategories;
    }


}
