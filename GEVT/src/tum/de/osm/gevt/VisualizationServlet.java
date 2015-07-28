package tum.de.osm.gevt;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/VisualizationServlet")
public class VisualizationServlet extends HttpServlet {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private InitializeResources connectionManager;
	private List<EventInfoBean> barDataList;
	String dateTo = new String("");
	String dateFrom = new String("");
	String category = null;
	String subCategory = null;
	String related = null;
	String categoryToFillSubCat = null;
	String fullQuery = null;
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
     {
		try {
			doProcess(request, response);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 
	}
	
	protected void doProcess(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, ParseException {
		 response.setContentType("application/json");
		 List<EventInfoBean> barDataObj=null;
		 List<String> subcategories = null;
		  dateTo = request.getParameter("dateTo");
	      dateFrom = request.getParameter("dateFrom");
		  category = request.getParameter("category");
		  subCategory = request.getParameter("subCategory");
		  related = request.getParameter("related");
		  categoryToFillSubCat = request.getParameter("categoryToFillSubCat");
		  fullQuery = request.getParameter("fullQuery");
		 
		 System.out.println(dateTo);
		 System.out.println(dateFrom);
		 System.out.println(category);
		 System.out.println(subCategory);
		 String json=null;
		 Gson gson = new Gson();
		 
		 
		 if (categoryToFillSubCat != null){
			 subcategories = getSubCategoriesFromDB(categoryToFillSubCat);
			 json = gson.toJson(subcategories);
		 }else if (  ((!dateTo.equals("0")   && !dateFrom.equals("0")))
				 || category!= "" || subCategory != "" || related !=null){
		
		//	 barDataObj =  visualizeQuery(dateTo,dateFrom,category,subCategory,fullQuery,related);
			 
			 barDataObj =  visualizeQuery(dateTo,dateFrom,category,subCategory,fullQuery,related);

				// convert java object to JSON format,
				// and returned as JSON formatted string
				 json = gson.toJson(barDataObj);
		 }	
		  
		   //System.out.println("list size "+heatMapObj.size());
			System.out.println(json);
			response.getWriter().write(json);

	}
	
	public boolean isNullOrBlank(String param) { 
	    return param == null || param.trim().length() == 0;
	}

	public List<EventInfoBean> visualizeQuery(String toDate, String fromDate, String category, 
			String subcategory, String fullQuery, String related){
		connectionManager = new InitializeResources();
		
		 System.out.println("#####################" + dateTo.equals("0"));
		 System.out.println(toDate);
		 System.out.println(fromDate);
	
	    	Statement stmt = null;
	    	Connection conn=null;
	    	ResultSet rs;
	    	StringBuffer query;
	   
	    	try{ 
	    		barDataList = new ArrayList<EventInfoBean>();
	    		query = new StringBuffer();
	    		query.append(" SELECT latitude/10000000.0 as latitude, longitude/10000000.0 as longitude, category, subcategory FROM search_event where ");
               
	    		if (fullQuery.equals("true")){
	    			query.append(" category = '").append(category).append("'").
		    		append(" AND subcategory = '").append(subcategory).append("'").
		    		append( " AND  startdate between  '").append(toDate).append("'").
		    		append(" AND '").append(fromDate).append("'").
	      			append( " AND related_items LIKE '%").append(related).append(" %'");

	    		}
	    		else if ((!toDate.equals("0") && !fromDate.equals("0")) && category !="" 
	    				 && subcategory =="" && related == null){
	 	    		query.append( "   startdate between   '").append(toDate).append("'").
		    		append(" AND '").append(fromDate).append("'").
		    		append(" AND category = '").append(category).append("'");
	    		
	    		}
	    		else if (category !="" && subcategory == "" && (toDate.equals("0") && fromDate.equals("0") )
	    				&& related==null){ 
	    			query.append("  category = '").append(category).append("'");
	    		}
	    		else if (category !="" && subcategory != "" && related!=null 
	    				&& (toDate.equals("0") && fromDate.equals("0") )
	    				){ 
	    			query.append("  category = '").append(category).append("'").
	    			append(" AND subcategory = '").append(subcategory).append("'").
	    			append( " AND related_items LIKE '%").append(related).append(" %'");
	    			
	    		}
	    		else if(!toDate.equals("0") && !fromDate.equals("0") && category =="" && subcategory == ""
	    				&& related==null){
	    			query.append( "   startdate between '").append(toDate).append("'").
		    		append(" AND '").append(fromDate).append("'");
	    		}
	    		else if (category!= "" && subcategory!= ""
	    				&& toDate.equals("0") && fromDate.equals("0") && related== null){
	    		
	    				query.append(" category = '").append(category).append("'").
			    		append(" AND subcategory = '").append(subcategory).append("'");
	    		}
	    		else if(related != null && toDate.equals("0") && fromDate.equals("0") && category =="" && subcategory == ""){
	    			query.append( " related_items LIKE '%").append(related).append(" %'");
		    	}
	    		else if(related != null && category!= ""
	    				&& toDate.equals("0") && fromDate.equals("0") && subcategory == ""){
	    			query.append( " WHERE related_items LIKE '%").append(related).append(" %'").
	    			append(" and  category = '").append(category).append("'");

	    		}	
	    		else if(related != null && !toDate.equals("0") && !fromDate.equals("0") &&
	    				category== "" && subcategory == ""
	    			){
	    			query.append( " related_items LIKE '%").append(related).append(" %'").
	    			append( " AND  startdate between '").append(toDate).append("'").
		    		append(" AND '").append(fromDate).append("'");

	    		}
	    		else if( (!toDate.equals("0") && !fromDate.equals("0")) &&
	    				category!= "" && subcategory != "" && related == null
	    			){
	    			query.append( "  startdate between '").append(toDate).append("'").
		    		append(" AND '").append(fromDate).append("'").
		    		append(" AND category = '").append(category).append("'").
		    		append(" AND subcategory = '").append(subcategory).append("'");
	 		    }
	    		

	    		else if(related != null  &&
	    				category!= ""  &&
	    				!toDate.equals("0") && !fromDate.equals("0")
	    				&& subcategory == ""
	    			){
	    			query.append( "  startdate between '").append(toDate).append("'").
		    		append(" AND '").append(fromDate).append("'").
		    		append(" AND category = '").append(category).append("'").
	    			append( " AND related_items LIKE '%").append(related).append(" %'");

	    		}

	    		
	    		System.out.println(query.toString());
	    		conn=  connectionManager.getConnection();
	    		stmt = conn.createStatement();
	    		
	    		rs = stmt.executeQuery(query.toString());
	    		try {
	    			while (rs.next()) {
	    				double laitude = rs.getDouble("latitude");
	    				double longitude = rs.getDouble("longitude");
	    				String categoryData = rs.getString("category");
	    				String subcategoryData = rs.getString("subcategory");
	    		    	
	    		
	    				barDataList.add(new EventInfoBean(laitude,longitude,categoryData,subcategoryData));
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
	    	return barDataList;
	    }
   public List<String> getSubCategoriesFromDB(String category){
   	Statement stmt = null;
   	Connection conn=null;
   	ResultSet rs;
   	StringBuilder query;
   	List<String> subCategories=null;
   	try{ 
   		query = new StringBuilder();
   		connectionManager = new InitializeResources();
   		query.append("   select distinct subcategory from search_event where category='").
   		append(category).append("'");
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
