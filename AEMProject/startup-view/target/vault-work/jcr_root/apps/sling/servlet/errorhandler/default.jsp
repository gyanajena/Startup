<%@include file="/libs/foundation/global.jsp"%>
<%@page import="com.sapient.cms.services.osgi.ErrorPageHandler,com.mgm.cms.osgi.config.MGMSystemConfig,com.day.cq.wcm.commons.WCMUtils"%>
<%@page session="false"%>

<%
    ErrorPageHandler errorPageHandler = sling.getService(ErrorPageHandler.class);
    if (errorPageHandler != null && WCMMode.DISABLED.equals(WCMMode.fromRequest(request))) {
    	int statusCode = 500;
    	Integer scObject = (Integer) request.getAttribute("javax.servlet.error.status_code");
    	if(scObject != null) {
    		statusCode = scObject.intValue();
    	} 
        final String path = errorPageHandler.findErrorPage(slingRequest, resource, statusCode);
        if (path != null) {
            errorPageHandler.resetRequestAndResponse(slingRequest, slingResponse, statusCode);
            errorPageHandler.includeUsingGET(slingRequest, slingResponse, path);
            return;
        }
    }
%>
<%@include file="/libs/sling/servlet/errorhandler/default.jsp" %>
