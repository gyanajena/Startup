/*************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2012 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/

CUI.rte.ui.ext.ExtToolbarBuilder = new Class({

    toString: "ExtToolbarBuilder",

    extend: CUI.rte.ui.ToolbarBuilder,

    createElement: function(id, plugin, toggle, tooltip, css, cmdDef) {
        // disable tooltip if QuichTips are not available or disabled
        if (!(CQ.Ext.QuickTips && CQ.Ext.QuickTips.isEnabled())) {
            tooltip = null;
        }
        return new CUI.rte.ui.ext.ElementImpl(id, plugin, toggle, tooltip, css,
                cmdDef);
    },

    createParaFormatter: function(id, plugin, tooltip, formats) {
        return new CUI.rte.ui.ext.ParaFormatterImpl(id, plugin, false, tooltip,
                false, undefined, formats);
    },

    createVariableFormatter: function(id, plugin, tooltip, formats) {
        return new CUI.rte.ui.ext.VariableFormatterImpl(id, plugin, false, tooltip,
                false, undefined, formats);
    },

    createStyleSelector: function(id, plugin, tooltip, styles) {
        return new CUI.rte.ui.ext.StyleSelectorImpl(id, plugin, false, tooltip,
                false, undefined, styles);
    }

});