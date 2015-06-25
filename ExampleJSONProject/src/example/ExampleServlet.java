package example;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/ExampleServlet")
public class ExampleServlet extends HttpServlet {

	
	public void doGet(HttpServletRequest request, HttpServletResponse response){
		
	}
	
	
	public void doPost(HttpServletRequest request, HttpServletResponse response){
		
		//set response type
		response.setContentType("application/json");
		
		
		String firstName = request.getParameter("fname");
		String lastName = request.getParameter("lname");
		
		ExampleBean exampleBean = new ExampleBean();
		exampleBean.setFname(firstName);
		exampleBean.setLname(lastName);
		
		//prepare json on server
		Gson gson = new Gson();
		// convert java object to JSON format,
		// and returned as JSON formatted string
		String json = gson.toJson(exampleBean);
		try {
			PrintWriter out = response.getWriter();
			out.write(json);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		System.out.println(json);
		
	}
	
}
