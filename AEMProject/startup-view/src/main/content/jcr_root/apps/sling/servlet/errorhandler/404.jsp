<%@include file="/libs/foundation/global.jsp"%>
<%@page import="com.sapient.cms.services.osgi.ErrorPageHandler,com.mgm.cms.osgi.config.MGMSystemConfig"%>
<%@page session="false"%>

<%
    ErrorPageHandler errorPageHandler = sling.getService(ErrorPageHandler.class);
    if (errorPageHandler != null) {
        final String path = errorPageHandler.findErrorPage(slingRequest, resource, 404);
        if (path != null) {
            slingResponse.setStatus(404);
            errorPageHandler.includeUsingGET(slingRequest, slingResponse, path);
            return;
        }
    }
%>
<%@include file="/libs/sling/servlet/errorhandler/default.jsp" %>
