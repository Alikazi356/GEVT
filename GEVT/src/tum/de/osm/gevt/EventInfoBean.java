package tum.de.osm.gevt;

import java.util.Date;

public class EventInfoBean {

	private String eventName;
	private Double latitude;
	private Double longitude;
	private String date;
	private int noOfEvents;
	private String category;
	private String eventYear;
	private String subcategory;
	private String noOfParticipants;
	private int yAxisData;
	private String time;
	private String relatedItems;
	private String url;
	



	public EventInfoBean() {
		super();

	}
	
	public EventInfoBean( double latitude, double longitude, String category) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.category = category;
	}
	
	public EventInfoBean( double latitude, double longitude, String category, int noOfEvents,String subcategory) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.noOfEvents = noOfEvents;
		this.category = category;
		this.subcategory = subcategory;
	}
	
	public EventInfoBean( double latitude, double longitude, String category,String subcategory, 
			String noOfParticipants,String relatedItems,String name, String url) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.noOfParticipants = noOfParticipants;
		this.category = category;
		this.subcategory = subcategory;
		this.relatedItems = relatedItems;
		this.eventName = name;
		this.url = url;
	}

	public EventInfoBean( String category, int noOfEvents) {
		super();
		this.noOfEvents = noOfEvents;
		this.category = category;
	}
	
	public EventInfoBean( String category,String subcategory, int noOfEvents) {
		super();
		this.noOfEvents = noOfEvents;
		this.category = category;
		this.subcategory =subcategory;
	}
	
	public EventInfoBean( String category,String subcategory, String noOfParticipants) {
		super();
		this.noOfParticipants = noOfParticipants;
		this.category = category;
		this.subcategory =subcategory;
	}
	
	
	public EventInfoBean( String category, String noOfParticipants) {
		super();
		this.noOfParticipants = noOfParticipants;
		this.category = category;
	}
	
	
	public EventInfoBean(String category2, int noOfEvents2,
			String noOfParticipants2, String time2) {
		this.noOfParticipants = noOfParticipants2;
		this.category = category2;
		this.time = time2;
		this.noOfEvents = noOfEvents2;
	
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public String getEventYear() {
		return eventYear;
	}

	public void setEventYear(String eventYear) {
		this.eventYear = eventYear;
	}

	public String getSubcategory() {
		return subcategory;
	}

	public void setSubcategory(String subcategory) {
		this.subcategory = subcategory;
	}

	public String getNoOfParticipants() {
		return noOfParticipants;
	}

	public void setNoOfParticipants(String noOfParticipants) {
		this.noOfParticipants = noOfParticipants;
	}

	public EventInfoBean( String category, int noOfEvents, String eventYear) {
		this.noOfEvents = noOfEvents;
		this.category = category;
		this.eventYear = eventYear;
	}


	public EventInfoBean(String eventName, Double latitude, Double longitude,
			String date) {
		this.eventName = eventName;
		this.latitude = latitude;
		this.longitude = longitude;
		this.date = date;
	}

	public EventInfoBean(Double latitude, Double longitude, String category, String subcategory) {
		super();
		this.latitude = latitude;
		this.longitude = longitude;
		this.category = category;
		this.subcategory = subcategory;
	}


	public String getCategory() {
		return category;
	}

	public int getNoOfEvents() {
		return noOfEvents;
	}

	public void setNoOfEvents(int noOfEvents) {
		this.noOfEvents = noOfEvents;
	}

	public void setCategory(String category) {
		this.category = category;
	}
	public int getyAxisData() {
		return yAxisData;
	}

	public void setyAxisData(int yAxisData) {
		this.yAxisData = yAxisData;
	}

	public EventInfoBean( Double latitudeResult,
			Double longitudeResult) {
		this.latitude = latitudeResult;
		this.longitude= longitudeResult;
	}
	public EventInfoBean(String eventName2) {
		this.eventName = eventName2;
	}


	public EventInfoBean(String category2, int noOfEvents2,
			String noOfParticipants2, String time2, Double latitude2,
			Double longitude2) {
	   this.category = category2;
	   this.noOfEvents = noOfEvents2;
	   this.noOfParticipants = noOfParticipants2;
	   this.time = time2;
	   this.latitude = latitude2;
	   this.longitude = longitude2;
	
	}

	public EventInfoBean(String category2, int noOfEvents2,
			String noOfParticipants2, String time2, Double latitude2,
			Double longitude2, String subcategory2) {
		   this.category = category2;
		   this.noOfEvents = noOfEvents2;
		   this.noOfParticipants = noOfParticipants2;
		   this.time = time2;
		   this.latitude = latitude2;
		   this.longitude = longitude2;
		   this.subcategory = subcategory2;
	}

	public String getEventType() {
		return eventName;
	}
	public void setEventType(String eventType) {
		this.eventName = eventType;
	}
	public Double getLatitude() {
		return latitude;
	}
	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}
	public Double getLongitude() {
		return longitude;
	}
	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	

}
