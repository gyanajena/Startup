/*
 * Copyright 1997-2008 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * A set of common functions for edit components. EditBase should not
 * be instantiated directly.
 * @class CQ.wcm.EditBase
 */
CQ.wcm.EditBase = {

    /**
     * @cfg {Array/String} actions
     * An array of Ext.Button configs or an array of strings or a single string.
     * The strings may be one of the following: <ul>
     * <li>{@link #EditBase.EDIT}</li>
     * <li>{@link #EditBase.DELETE}</li>
     * <li>{@link #EditBase.INSERT}</li>
     * <li>{@link #EditBase.ANNOTATE}</li>
     * <li>{@link #EditBase.COPYMOVE}</li>
     * <li>{@link #EditBase.EDITDELETE}</li>
     * <li>{@link #EditBase.EDITDELETEINSERT}</li>
     * <li>{@link #EditBase.EDITCOPYMOVEINSERT}</li>
     * <li>{@link #EditBase.EDITCOPYMOVEDELETEINSERT}</li>
     * <li>{@link #EditBase.EDITANNOTATE}</li>
     * <li>{@link #EditBase.EDITANNOTATEDELETE}</li>
     * <li>{@link #EditBase.EDITANNOTATECOPYMOVEDELETEINSERT}</li>
     * <li>{@link #EditBase.EDITANNOTATECOPYMOVEINSERT}</li>
     * <li>{@link #EditBase.EDITANNOTATEDELETEINSERT}</li>
     * </ul>
     * <br>Usages:
     * <pre><code>
     actions: CQ.wcm.EditBase.EDITDELETE

     actions: [
     CQ.wcm.EditBase.EDITDELETE,
     {
        text: "Custom Button",
        handler: ...
     }
     ]
     </code></pre>
     */
    actions: null,

    /**
     * @cfg {String} editText
     * The text for the default edit button.
     */
    editText: null,

    /**
     * @cfg {String} deleteText
     * The text for the default delete button.
     */
    deleteText: null,

    /**
     * @cfg {String} insertText
     * The text for the default insert button.
     */
    insertText: null,

    /**
     * @cfg {String} copyText
     * The text for the default copy button.
     */
    copyText: null,

    /**
     * @cfg {String} pasteText
     * The text for the default paste button.
     */
    pasteText: null,

    /**
     * @cfg {String} referenceText
     * The text for the default reference button.
     */
    referenceText: null,


    /**
     * @cfg {Object} params
     * The params that will be passed to the edit dialog.
     * <pre><code>
     params: {
     paramName1: "value 1",
     paramName2: "value 2"
}
     </code></pre>
     */
    params: {},

    /**
     * @cfg {CQ.Dialog/Object/String} dialog
     * The dialog, the dialog config or URL to retrieve the dialog config from.
     */
    dialog: null,

    /**
     * @cfg {CQ.Ext.Element/HTMLElement/String} element
     * The HTML element or ID of the element to anchor the edit component to.
     */
    element: null,

    /**
     * @cfg {String} path
     * The content path for the edit component.
     **/
    /** @property {String} path
     * Content path of the edit component.
     */
    path: null,

    /**
     * @cfg {String} insertBehavior
     * The behavior of the edit component when inserting new content.
     */
    insertBehavior: null,

    /**
     * The last action being executed.
     * @private
     * @type String
     */
    lastAction: null,

    /**
     * The dialogs used by the edit component.
     * @private
     * @type Object
     */
    dialogs: null,

    /**
     * @cfg {Boolean} orderable
     * True to define the edit component as orderable, ie it can be dragged and dropped (default is true).
     */
    orderable: true,

    /**
     * @cfg {String} targetMode
     * Mode for displaying a target ghost or line below the current component while dragging over.
     * Possible values are: <ul>
     * <li>{@link #EditBase.TARGET_MODE_GHOST} (default), displays an empty box below current edit component
     * <li>{@link #EditBase.TARGET_MODE_LINE}, displays a line below current edit component
     * </ul>
     */
    targetMode: null,

    //TODO unused?
    componentPath: null,

    /**
     * @cfg {Object[]} dropTarget
     * An array of config objects describing: <ul>
     * <li>DOM elements which must be drop targets</li>
     * <li>accepted drag objects (defined by group and accept).</li>
     *</ul>
     * <pre><code>
     dropTarget: [
     {
        "id": "imageId",
        "name": "./image/fileReference",
        "accept": ["image/"],
        "groups": ["media"]
     }
     ]
     </code></pre>
     */
    dropTarget: null,

    /**
     * @cfg {Boolean} isDropTarget
     * True to define the edit component as a drop target (default is true).
     */
    isDropTarget: null,

    /**
     * Component drop target.
     * @private
     * @type {CQ.wcm.EditBase.DropTarget}
     */
    componentDropTarget: null,

    /**
     * Element drop target.
     * @private
     * @type {CQ.wcm.EditBase.DropTarget}
     */
    elementDropTarget: null,

    /**
     * Sub drop targets created from dropTarget config property.
     * @private
     * @type {CQ.wcm.EditBase.DropTarget}
     */
    subDropTargets: null,

    /**
     * Name of the drag zone class
     * @private
     */
    dragZoneClass: null,

    /**
     * Name of the drop target class
     * @private
     */
    dropTargetClass: null,

    /**
     * @cfg {string/Number} inlineEditing
     * Inline editing mode defines if the component editing (edit action) is done through an inline editing
     * or through a floating dialog. Possible values are: <ul>
     *<li>{@link #EditBase.INLINE_MODE_AUTO}: the edit dialog is opened only if component element width is
     * more than the minimum defined in the theme. Otherwise inline editing is used.</li>
     *<li>{@link #EditBase.INLINE_MODE_NEVER}: no inline editing, floating dialog is always opened.</li>
     *<li>{@link #EditBase.INLINE_MODE_FORCED}: always uses inline editing.</li>
     * </ul>
     * <br>Usage:
     * <pre><code>
     inlineEditing: CQ.wcm.EditBase.INLINE_MODE_NEVER
     </code></pre>
     * An Number value overrides default minimum size. Floating dialog is opened
     * if component element width is more than this minimum size.
     <pre><code>
     inlineEditing: 300
     </code></pre>
     */
    inlineEditing: null,

    /**
     * @cfg {Object} inplaceEditing
     * Base configuration for inplace editing; may be null if inplace editing is not
     * available for the component
     */
    inplaceEditing: null,

    /**
     * @cfg {Boolean} isContained
     * True to define if component is contained in a div. This div will be created, moved and deleted
     * with the component (default is true).
     */
    isContained: null,

    /**
     * @cfg {Boolean} isContainer
     * True to define if component is a container, e.g. a parsys. this is set
     * via the make editable call and is defined in the component definition.
     */
    isContainer: false,

    /**
     * @cfg {String} containerClass
     * CSS class attached to the container div (default is "section").
     */
    containerClass: null,

    /**
     * @cfg {string} IEScriptInsert
     * Dynamically inserting and executing a script on IE does not work if script is the first tag
     * or is preceded only by divs. See insertAdjacentHTML() function bug on IE.
     * IEScriptInsert contains HTML content (default is <code>&lt;div style="display:none;"&gt;&amp;nbsp;&lt;/div&gt;</code>). On IE only, it will be inserted before any element
     * (containing at least one script tag) which would be inserted in the DOM and script would be executed.
     */
    IEScriptInsert: '<div style="display:none;">&nbsp;</div>',

    /**
     * Class escaped relative path of the editing starting after "jcr:content".
     * @private
     * @type String
     */
    clsPath: null,

    /**
     * Design cell search path. This is used to retrieve the proper styles and
     * component list for the 'new' dialogs.
     *
     * @private
     * @type String
     */
    cellSearchPath: null,

    /**
     * Design cell. This is used to retrieve the proper styles and
     * component list for the 'new' dialogs. It is created on demand by
     * {@link #getCell()} using the {@link #cellSearchPath}.
     *
     * @private
     * @type CQ.wcm.Cell
     */
    cell: null,

    /**
     * True if the component is currently inplace edited
     * @private
     * @type Boolean
     */
    isInplaceEdited: false,

    /**
     * Currently active inplace editor
     * @private
     * @type CQ.ipe.InplaceEditor
     */
    inplaceEditor: null,

    /**
     * The annotations
     * @private
     * @type Object
     */
    annotations: null,

    /**
     * Handlers added as event listeners to selections that have to be removed
     * when this component is destroyed.
     * @private
     * @type Array
     */
    selectionHandlers: null,

    /**
     * Handlers added as event listeners to clipboard that have to be removed
     * when this component is destroyed.
     * @private
     * @type Array
     */
    clipboardHandlers: null,


    constructor: function() {},

    /**
     * Constructor beginning (used by EditBar and EditRollover).
     * @param {Object} config
     * @private
     */
    constructorStart: function(config) {
        this.actions = [];
        this.dialogs = {};
        this.annotations = {};
        this.selectionHandlers = [];
        this.clipboardHandlers = [];

        this.initRefreshShortcuts();
        this.initI18n(config);
        this.params = config.params;

        this.inheritConfig(config);

        this.listenersChecker(config);
    },

    /**
     * Constructor end (used by EditBar and EditRollover).
     * @param {Object} config
     * @private
     */
    constructorEnd: function(config) {
        // update component list if we are a 'container'
        if (config.isContainer) {
            this.updateComponentList.defer(16,this);
        }
    },

    /**
     * Constructor end (used by EditBar and EditRollover).
     * @private
     */
    initComponentEnd: function() {
        (function(){
            // get annotations
            var info = CQ.WCM.getPageInfo(CQ.WCM.getPagePath());
            if (info.annotations && info.annotations.indexOf(this.path) != -1) {
                this.loadAnnotations();
            }
        }).defer(16, this);
    },

    /**
     * <p>Loads the annotations.</p>
     * <p>Note that (since 5.5) existing annotations are removed before loading commences
     * to prevent annotations appearing multiple times if loaded multiple times.</p>
     * @param {Boolean} preventAsync (optional) True to prevent asynchroneous loading of
     *        annotations (since 5.5)
     */
    loadAnnotations: function(preventAsync) {
        var editComponent = this;
        var processResponse = function(data) {
            editComponent.clearAnnotations();
            for (var name in data) {
                if (name == "jcr:primaryType") continue;
                var a = data[name];
                if (!a) return;
                editComponent.addAnnotation({
                    "text": a.text,
                    "lastModified": a["jcr:lastModified"],
                    "lastModifiedBy": a["jcr:lastModifiedBy"],
                    "offsetX": a.x,
                    "offsetY": a.y,
                    "width": a.w,
                    "height": a.h,
                    "minimized": a.minimized,
                    "color": a.color,
                    "sketches": a.sketches ? a.sketches : {}
                }, name);
            }
        };
        var url = this.path + "/" + CQ.wcm.EditBase.ANNOTATIONS
            + CQ.Sling.SELECTOR_INFINITY + CQ.HTTP.EXTENSION_JSON;
        if (!preventAsync) {
            CQ.HTTP.get(url, function(options, success, response) {
                    var data = CQ.HTTP.eval(response);
                    if (success) {
                        processResponse(data);
                    }
                }
            );
        } else {
            var response = CQ.HTTP.get(url);
            if (CQ.HTTP.isOk(response)) {
                processResponse(CQ.HTTP.eval(response));
            }
        }
    },

    /**
     * Returns if this editable has registered annotations
     */
    hasAnnotations: function() {
        for (var elem in this.annotations) {
            return true;
        }
        return false;
    },

    /**
     * Removes all registered annotations from the editable (but not from the repository!).
     * @private
     */
    clearAnnotations: function() {
        for (var id in this.annotations) {
            if (this.annotations.hasOwnProperty(id)) {
                this.annotations[id].destroy();
            }
        }
        this.annotations = { };
    },

    /**
     * @param {Object} config
     * @param {String} name
     * @param {Boolean} preventFocus (optional) True to definitely prevent the annotation from
     *        receiving focus
     * @return {CQ.wcm.Annotation} The annotation
     * @private
     */
    addAnnotation: function(config, name, preventFocus) {
        if (!name) name = "";
        var id = CQ.Util.createId();
        config = CQ.Util.applyDefaults(config, {
            "path": this.path + "/" + CQ.wcm.EditBase.ANNOTATIONS + "/" + name,
            "editComponent": this,
            "id": id
        });
        var a = new CQ.wcm.Annotation(config);

        this.annotations[id] = a;
        a.show((name == "") && !preventFocus); // "": new annotation: do focus
        return a;
    },

    /**
     * Returns the specified annotation.
     * @param {String} id The ID of the annotation
     * @return {CQ.wcm.Annotation} The annotation; undefined if no annotation is available
     *         for the specified ID
     */
    getAnnotation: function(id) {
        return this.annotations[id];
    },

    /**
     * Returns the annotation at the specified path.
     * @param {String} path The path
     * @return {CQ.wcm.Annotation} The annotation; undefined if no annotation is available
     *         for the specified path
     */
    getAnnotationAt: function(path) {
        for (var id in this.annotations) {
            if (this.annotations.hasOwnProperty(id)) {
                if (this.annotations[id].path == path) {
                    return this.annotations[id];
                }
            }
        }
        return undefined;
    },

    /**
     * @param {String} id
     * @private
     */
    removeAnnotation: function(id) {
        this.annotations[id].destroy();
        delete this.annotations[id];
    },


    /**
     * Removes all annotations
     * @private
     */
    removeAnnotations: function() {
        for (var id in this.annotations) {
            this.removeAnnotation(id);
        }
    },

    showAnnotations: function() {
        for (var id in this.annotations) {
            this.annotations[id].show();
        }
    },

    hideAnnotations: function() {
        for (var id in this.annotations) {
            this.annotations[id].hide();
        }
    },

    /**
     * @private
     */
    alignAnnotations: function() {
        for (var name in this.annotations) {
            var a = this.annotations[name];
            a.align();
        }
    },

    /**
     * @private
     */
    observeElementPosition: function() {
        var xy = this.element.getXY();
        if (!CQ.Util.isEqualPosition(xy, this.formerXY, 1)) {
            if (!this.elementHidden) {
                this.alignAnnotations();
            }
        }
        this.formerXY = xy;
    },

    /**
     * Returns the config for the default edit button.
     * @return {Object} The config for the default edit button
     * @private
     */
    getEditConfig: function() {
        var ec = this;
        return {
            "text": this.editText,
            "handler": function () {
                CQ.wcm.EditBase.showDialog(this, CQ.wcm.EditBase.EDIT);
            },
            "listeners": {
                "render": function(action) {
                    var editComponent = this;
                    var selection = CQ.WCM.getSelection();
                    if (selection.getCount() > 1 &&
                        selection.contains(editComponent)) {
                        action.disable();
                    }

                    var handler = function() {
                        var selection = CQ.WCM.getSelection();
                        if (selection.getCount() > 1 &&
                            selection.contains(editComponent)) {
                            action.disable();
                        } else {
                            action.enable();
                        }
                    };
                    CQ.WCM.onSelectionChange(handler);
                    ec.selectionHandlers.push(handler);
                }
            }
        };
    },

    /**
     * Returns the config for the default delete button.
     * @return {Object} The config for the default delete button
     * @private
     */
    getDeleteConfig: function() {
        return {
            "text": this.deleteText,
            "handler": function() {
                var p = this.getTargetParent();
                if (p) {
                    // if the parent is not null then this component's parent is a target wrapper, so we need to delete the wrapper.
                    p.removeParagraph();
                } else {
                    // if the parent is  null then this component is a) not targeted at all or b) inside a target paragraph
                    // either way we only need to delete the component itself.
                    this.removeParagraph();
                }
            }
        };
    },

    /**
     * Returns the config for the default insert button.
     * @return {Object} The config for the default insert button
     * @private
     */
    getInsertConfig: function() {
        var ec = this;
        return {
            "text": this.insertText,
            "handler": function (b) {
                CQ.wcm.EditBase.showDialog(this, CQ.wcm.EditBase.INSERT, true);
            },
            "listeners": {
                "render": function(action) {
                    var editComponent = this;
                    var selection = CQ.WCM.getSelection();
                    if (selection.getCount() > 1 &&
                        selection.contains(editComponent)) {
                        action.disable();
                    }

                    var handler = function() {
                        var selection = CQ.WCM.getSelection();
                        if (selection.getCount() > 1 &&
                            selection.contains(editComponent)) {
                            action.disable();
                        } else {
                            action.enable();
                        }
                    };
                    CQ.WCM.onSelectionChange(handler);
                    ec.selectionHandlers.push(handler);
                }
            }
        };
    },

    /**
     * Removes the handlers of selectionHandlers from listeners of the selection
     * @private
     */
    removeSelectionListeners: function() {
        for (var i = 0; i < this.selectionHandlers.length; i++) {
            CQ.WCM.unSelectionChange(this.selectionHandlers[i]);
        }
    },

    /**
     * Removes the handlers of clipboardHandlers from listeners of the clipboard
     * @private
     */
    removeClipboardListeners: function() {
        for (var i = 0; i < this.clipboardHandlers.length; i++) {
            CQ.WCM.unClipboardChange(this.clipboardHandlers[i]);
        }
    },


    /**
     * Returns the config for the default cut/copy/paste buttons.
     * @return {Object[]} The config for the default cut/copy/paste buttons
     * @private
     */
    getCopyMoveConfig: function() {
        return [
            {
                "text": this.cutText,
                "handler": function() {
                    var items = CQ.WCM.getSelectedItems();
                    if (items.length == 0) {
                        items.push(this);
                    }
                    CQ.WCM.cut(items);
                }
            },
            {
                "text": this.copyText,
                "handler": function() {
                    var items = CQ.WCM.getSelectedItems();
                    if (items.length == 0) {
                        items.push(this);
                    }
                    CQ.WCM.copy(items);
                }
            },
            this.getPasteConfig()
            //            this.getReferenceConfig()
        ];
    },

    /**
     * Returns the config for the default reference button.
     * @return {Object[]} The config for the default reference button
     * @private
     */
    //    getReferenceConfig: function() {
    //        var ec = this;
    //        return {
    //            "text": this.referenceText,
    //            "handler": function() {
    //                var toPaste = CQ.WCM.paste();
    //                while (toPaste.length > 0) {
    //                    var item = toPaste.shift();
    //                    this.referenceParagraph(item.path);
    //                }
    //            },
    //            "listeners": {
    //                // todo: only enable action if eligible item(s) in clipboard
    //                "render": function(action) {
    //                    var clipboard = CQ.WCM.getClipboard();
    //                    if (!clipboard.getCount()) {
    //                        action.disable();
    //                    }
    //                    var handler = function() {
    //                        if (!clipboard.getCount()) {
    //                            action.disable();
    //                        } else {
    //                            action.enable();
    //                        }
    //                    };
    //                    CQ.WCM.onClipboardChange(handler);
    //                    ec.clipboardHandlers.push(handler);
    //                }
    //            }
    //        }
    //    },

    /**
     * Returns the config for the default paste button.
     * @return {Object[]} The config for the default paste button
     * @private
     */
    getPasteConfig: function() {
        var ec = this;
        return {
            "text": this.pasteText,
            "handler": function() {
                var muu = CQ.undo.util.MultiUndoUtils;
                var undoCfg = muu.begin();
                var toPaste = CQ.WCM.paste();
                while (toPaste.length > 0) {
                    var item = toPaste.shift();
                    if (item.action != CQ.WCM.ACTION_CUT) {
                        this.copyParagraph(item.path, item.resourceType, item.hasAnnotations);
                    } else {
                        muu.determineMoveInformation(undoCfg, item);
                        var newPath = this.moveParagraph(item.path, item.resourceType, item.hasAnnotations);
                        if (newPath) {
                            muu.addMoveAction(undoCfg, newPath, this);
                        }
                    }
                }
                muu.reverseActions(undoCfg);
                muu.commit(undoCfg);
            },
            "listeners": {
                // todo: only enable action if eligible item(s) in clipboard
                "render": function(action) {
                    var clipboard = CQ.WCM.getClipboard();
                    if (!clipboard.getCount()) {
                        action.disable();
                    }
                    var handler = function() {
                        if (!clipboard.getCount()) {
                            action.disable();
                        } else {
                            action.enable();
                        }
                    };
                    CQ.WCM.onClipboardChange(handler);
                    ec.clipboardHandlers.push(handler);
                }
            }
        };
    },

    /**
     * Returns the config for the default annotate button.
     * @return {Object} The config for the default annotate button
     * @private
     */
    getAnnotateConfig: function() {
        return {
            "text": this.annotateText,
            "handler": function () {
                var xy = this.getNewAnnotationOffset();
                this.addAnnotation({
                    "path": this.path + "/" + CQ.wcm.EditBase.ANNOTATIONS + "/",
                    "editComponent": this,
                    "offsetX": xy[0],
                    "offsetY": xy[1]
                });
            }
        };
    },

    /**
     * Returns the target component ancestor, or null if this component is not targeted.
     *
     * @return {CQ.wcm.EditBase} The target ancestor editable or null if there is none
     */
    getTargetAncestor: function() {
        if (this.targetAncestor === undefined) {
            var component = this;
            while (component && component.getResourceType() !== CQ.wcm.EditBase.TARGET_COMPONENT) {
                component = component.getParentFromDOM();
            }
            this.targetAncestor = component;
        }
        return this.targetAncestor;
    },

    /**
     * Returns the targeted wrapper of this component. Note that this is different from getTargetAncestor() in the way that it only goes to check one level up the DOM tree.
     *
     * @returns {CQ.wcm.EditBase} The component wrapper or null if this has no direct parent that's targeted.
     */
    getTargetParent: function() {

        var component = this;
        var parentComponent = component.getParentFromDOM();
        var targetParent = null;

        if (parentComponent && parentComponent.getResourceType() == CQ.wcm.EditBase.TARGET_COMPONENT) {
            targetParent = parentComponent;
        }
        return targetParent;
    },

    /**
     * Returns the config for the default target or disable targeting action.
     * @param {Boolean} revert (optional) True to get a disable targeting action
     * @return {Object} The config for the default target button
     * @private
     */
    getTargetComponentConfig: function(revert) {
        return {
            "text": revert ? this.untargetText : this.targetText,
            "handler": function () {
                this.targetComponent(revert, revert);
            }
        };
    },

    getExperiencesConfig: function() {
        return {
            "text": this.experiencesText,
            "handler": function () {
                if (window.CQ && window.CQ.personalization && window.CQ.personalization.TargetEditor) {
                    CQ.personalization.TargetEditor.get(this.getTargetAncestor()).toggle();
                }
            }
        };
    },

    /**
     * Function to enable or disable targeting.
     * @static
     * @param {Boolean} revert (optional) True to disable targeting
     * @param {Boolean} confirm (optional) True to show a confirmation dialog first
     */
    targetComponent: function(revert, confirm) {
        var component = this;

        // when reverting, we could be either on the target wrapper (parent) or the wrapped component
        if (revert && component.getResourceType() !== CQ.wcm.EditBase.TARGET_COMPONENT) {
            component = component.getTargetAncestor();
        }

        function run(component) {
            var path = component.path;
            // if path ends with "/*", i.e. is parsys new placeholder...
            if (path.indexOf("/*") === (path.length - 2)) {
                // .. go one step above for targeting
                path = path.substring(0, path.length - 2);
            }
            CQ.Ext.Ajax.request({
                "url": path + (revert ? ".untarget" : ".target") + ".json",
                "params": { resourceType: component.getResourceType() },
                "method": "POST",
                "callback": function(options, success, xhr) {
                    var response = CQ.shared.HTTP.eval(xhr);
                    if (response.success) {
                        if (!revert) {
                            // show experiences popup immediately
                            // need to wait until component is replaced and editable was rebuilt
                            CQ.WCM.onEditableReady(path, function(editable) {
                                if (window.CQ && window.CQ.personalization && window.CQ.personalization.TargetEditor) {
                                    CQ.personalization.TargetEditor.get(editable).show();
                                }
                            });
                        }
                        component.refreshParent();
                    } else {
                        CQ.Notification.notify(CQ.I18n.getMessage("Error"), CQ.I18n.getMessage("Could not adapt component for targeting."));
                    }
                },
                "scope": this
            });
        }

        if (confirm) {
            // show confirmation dialog first
            CQ.Ext.Msg.confirm(
                revert ? CQ.I18n.getMessage("Disable targeting") : CQ.I18n.getMessage("Enable targeting"),
                revert ? CQ.I18n.getMessage("Do you really want to disable targeting for this component? Variants will only be disabled, not deleted.")
                    : CQ.I18n.getMessage("Do you really want to enable targeting for this component?"),
                function(btnId) {
                    if (btnId === "yes") {
                        run(component);
                    }
                },
                this
            );

        } else {
            run(component);
        }
    },

    /**
     * Returns the dialog used to edit content.
     * @return {CQ.Dialog} The dialog
     * @private
     */
    getEditDialog: function() {
        if (!this.dialogs[CQ.wcm.EditBase.EDIT]) {
            if (this.dialog instanceof CQ.Dialog) {
                this.dialogs[CQ.wcm.EditBase.EDIT] = this.dialog;
            }
            else {
                var config;
                if (typeof this.dialog == "string") {
                    config = {
                        url: this.dialog
                    };
                } else {
                    config = this.dialog;
                }
                config.responseScope = this;
                config.params = this.params;

                config = CQ.WCM.getDialogConfig(config);

                config = CQ.Util.applyDefaults(config, {
                    "title": CQ.I18n.getMessage("Edit Component"),
                    "params": {
                        "./jcr:lastModified": "",
                        "./jcr:lastModifiedBy": ""
                    }
                });

                if (this.enableLiveRelationship) {
                    config = CQ.Util.applyDefaults(config, {
                        "editLockMode": true,
                        "editLock": !this[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP][CQ.wcm.msm.MSM.PARAM_STATUS][CQ.wcm.msm.MSM.PARAM_IS_CANCELLED],
                        "editLockDisabled": !this[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP][CQ.wcm.msm.MSM.PARAM_STATUS][CQ.wcm.msm.MSM.PARAM_IS_EDITABLE],
                        "editLockDisabledTitle": CQ.I18n.getMessage("Inheritance is broken at the page or parent level")
                    });
                }

                if (this.element && this.element.getWidth() > this.getInlineConfig().size && !CQ.wcm.EditBase.isInlineDialogChildOpened(this.path)) {
                    config = CQ.Util.applyDefaults({
                        closable: false,
                        collapsible: false,
                        draggable: false,
                        header: false,
                        hideCollapseTool: true,
                        maximizable: false,
                        modal: false,
                        plain: true,
                        resizeHandles: "s",
                        shadow: false,
                        shadowOffset: 0,
                        title: null,
                        cls: this.getClsPath("cq-dialog")
                    }, config);
                }

                this.dialogs[CQ.wcm.EditBase.EDIT] = CQ.WCM.getDialog(config, "editdialog-" + this.path);

            }
        }
        this.lastAction = CQ.wcm.EditBase.ACTION_EDIT;
        return this.dialogs[CQ.wcm.EditBase.EDIT];
    },

    /**
     * Collects the list of allowed components and updates the current
     * 'component list'. before the update function on the component list is
     * called, an "updatecomponentlist" event is fired on this object.
     * this can be used to manipulate the list of allowed component dynamically.
     * eg:
     * <code>
     * function MyHandler(CQ.wcm.Cell cell, Array allowed, CQ.wcm.ComponentList componentList) {
     *    // manipulate the 'allowed' array if needed
     * }
     *
     * </code>
     * the "updatecomponentlist" listener can be registered using the normal
     * editConfig listeners on the container component (eg. parsys).
     *
     * Please note that "runtime" manipulations of the component list is currently
     * not supported. i.e. if the list of allowed components depends on client side
     * changes, this can't be propagated to the dialogs.
     */
    updateComponentList: function () {
        var cl = CQ.utils.WCM.getComponentList(this.path);
        var design = CQ.utils.WCM.getDesign(this.path);
        var cell = this.getCell();
        var allowed = design.getStyleProperty(cell, "components");
        if (!allowed) allowed = [];
        this.fireEvent(CQ.wcm.EditBase.EVENT_UPDATE_COMPONENTLIST, cell, allowed, cl);
        cl.update(cell, allowed);
    },

    /**
     * Returns the inline config used to edit content, as a {active, size} object.
     * active is a boolean representing if inline editing is enabled or not.
     * size is an integer representing the minimum width of the component element to allow inline editing.
     * @return {Object}
     * @private
     */
    getInlineConfig: function() {
        var active = true;
        var size = CQ.themes.wcm.EditBase.INLINE_MINIMUM_WIDTH;
        if (this.inlineEditing) {
            if (typeof this.inlineEditing == "string") {
                if (isNaN(this.inlineEditing)) {
                    if (typeof this.inlineEditing == "string" && this.inlineEditing.indexOf("CQ.wcm.EditBase") == 0) {
                        //string may be one of the CQ.wcm.EditBase.INLINE* config
                        //in that case, an eval is required
                        try {
                            this.inlineEditing = eval(this.inlineEditing);
                        } catch(error) {}
                    }
                    if (this.inlineEditing == CQ.wcm.EditBase.INLINE_MODE_NEVER) {
                        active = false;
                        size = Number.MAX_VALUE;
                    } else {
                        if (this.inlineEditing == CQ.wcm.EditBase.INLINE_MODE_FORCED) {
                            active = true;
                            size = 0;
                        }
                    }
                } else {
                    active = true;
                    size = parseInt(this.inlineEditing);
                }
            } else {
                if (typeof this.inlineEditing == "number") {
                    active = true;
                    size = this.inlineEditing;
                }
            }
        }

        return {
            "active": active,
            "size": size
        };
    },

    /**
     * Returns the dialog used to insert content.
     * @param {Boolean} ignoreIsContainer (optional) True to ignore the cq:isContainer
     *        property (and always take the the parent editing as permission target)
     * @return {CQ.Dialog} The dialog
     * @private
     */
    getInsertDialog: function(ignoreIsContainer) {
        ignoreIsContainer = (ignoreIsContainer === true);
        var dlg = this.dialogs[CQ.wcm.EditBase.INSERT];
        if (!dlg || (dlg.ignoreIsContainer != ignoreIsContainer)) {
            // define insert dialog
            var panel = new CQ.Ext.Panel({
                "border": false,
                "autoScroll":true,
                "layout":"accordion",
                "cls": "cq-sidekick-buttons"
            });

            var config = {
                "jcr:primaryType": "cq:Dialog",
                "title": CQ.I18n.getMessage("Insert New Component"),
                "items": panel,
                "width": CQ.themes.wcm.EditBase.INSERT_DIALOG_WIDTH,
                "cls": "cq-insertdialog " + this.getClsPath("cq-insertdialog")
            };
            dlg = CQ.WCM.getDialog(config, "insertdialog-" + this.path);
            this.dialogs[CQ.wcm.EditBase.INSERT] = dlg;
            var editing = this;
            dlg.ok = function() {
                editing.submitInsertDialog();
            };
            dlg.buttons[0].disable();

            // call the static method to avoid problems when CL originates from
            // content finder WCM.
            var cl = CQ.WCM.getComponentList(this.path);
            CQ.wcm.ComponentList.loadPanel(cl, panel, this, ignoreIsContainer);
            dlg.ignoreIsContainer = ignoreIsContainer;
        }
        else {
            this.selectInsertComponent(null);
        }
        this.lastAction = CQ.wcm.EditBase.ACTION_INSERT;
        return dlg;
    },

    /**
     * This method is called from the component list created at CQ.wcm.ComponentList#loadComponentList
     * when a component has been selected.
     * @private
     */
    selectInsertComponent: function(record) {
        if (record == null) {
            var dataViews = this.dialogs[CQ.wcm.EditBase.INSERT].findByType("dataview");
            for (var i = 0; i < dataViews.length; i++) {
                dataViews[i].clearSelections();
            }
            this.dialogs[CQ.wcm.EditBase.INSERT].buttons[0].disable();
            this.insertComponentRecord = null;
        }
        else {
            this.insertComponentRecord = CQ.Util.copyObject(record);
            this.dialogs[CQ.wcm.EditBase.INSERT].buttons[0].enable();
        }
    },

    /**
     * Creates a new paragraph when the insert dialog is submitted.
     * @private
     */
    submitInsertDialog: function() {
        if (!this.insertDialogMask) {
            this.insertDialogMask = new CQ.Ext.LoadMask(this.dialogs[CQ.wcm.EditBase.INSERT].getEl(), {
                "msg": CQ.wcm.EditBase.INSERTING_PARAGRAPH
            });
        }
        this.insertDialogMask.show();

        var e = this;
        var definition = this.insertComponentRecord.data;
        definition.insertBehavior = this.insertBehavior;
        window.setTimeout(function() {
            e.createParagraph(definition);
            e.dialogs[CQ.wcm.EditBase.INSERT].hide();
            e.insertDialogMask.hide();
        },1);
    },

    /**
     * Returns the parent of the current edit component (if available).
     * @return {CQ.wcm.EditBar/CQ.wcm.EditRollover} The parent edit component or null if not defined
     * @public
     */
    //config param is not documented on purpose: should not be used. Specific case only.
    // Note: using config could go away if we do
    //     this.element = CQ.Ext.get(config.element);
    // in the constructors (EditRollover, EditBar, etc.) *before* the
    // super constructor is called and extjs handles the config object
    getParent: function(config) {
        var p = config && config.path ? config.path : this.path;
        var parentPath;
        if (p.lastIndexOf("/") != -1) {
            parentPath = p.substring(0, p.lastIndexOf("/"));
        }
        if (parentPath) {
            return CQ.WCM.getEditable(parentPath);
        }
        else {
            return null;
        }
    },

    /**
     * Returns the parent path of the current edit component (if available).
     * @return {CQ.wcm.EditBar/CQ.wcm.EditRollover} The parent path of edit component or null if not defined
     * @public
     */
    getParentPath: function() {
        var parentPath;
        if (this.path && this.path.lastIndexOf("/") != -1) {
            parentPath = this.path.substring(0, this.path.lastIndexOf("/"));
        }

        return parentPath;
    },

    /**
     * Returns the parent editable based on the DOM structure of the components,
     * or null if there is no parent.
     *
     * Note: this could probably be moved into getParent() which currently does
     *       a path-based parent identification. This needs proper testing though.
     *
     * @return {CQ.wcm.EditBase} The parent editable or null if there is no parent
     */
    getParentFromDOM: function() {
        // result is kept to avoid recalculation; editables never change
        // their element or position (they are recreated on move/copy operations)
        if (this.parentEditable === undefined) {
            if (this.element && this.element.dom && this.element.dom.parentNode) {
                this.parentEditable = CQ.WCM.getEditableFromDOM(this.element.dom.parentNode);
            }
        }
        return this.parentEditable;
    },

    /**
     * Returns the resource type of the current edit component.
     * @return {String} The resource type
     * @public
     */
    getResourceType: function() {
        if (this.initialConfig && this.initialConfig.params && this.initialConfig.params["./sling:resourceType"]) {
            return this.initialConfig.params["./sling:resourceType"];
        } else {
            return "";
        }
    },

    /**
     * Returns the resource super type of the current edit component.
     * @return {String} The resource super type
     * @public
     */
    getResourceSuperType: function() {
        if (this.initialConfig && this.initialConfig.params && this.initialConfig.params["./sling:resourceSuperType"]) {
            return this.initialConfig.params["./sling:resourceSuperType"];
        } else {
            return "";
        }
    },

    /**
     * Inherits the config options from the specified edit component.
     * @private
     * @param {Object} config The config
     * @param {CQ.wcm.EditBar/CQ.wcm.EditRollover} editComponent The edit component
     * @return {Object} The merged config
     */
    inheritConfig: function(config, editComponent) {
        if (!editComponent) {
            editComponent = this.getParent(config);
        }
        if (!editComponent || !editComponent.childConfig) {
            return config;
        }

        return CQ.Ext.applyIf(config, editComponent.childConfig);
    },

    /**
     * Check listeners defined in config. If defined as string, try to morph to function reference.
     * @private
     * @param {Object} config The config
     * @return {Object} The updated config
     */
    listenersChecker: function(config) {
        if (config && config.listeners) {
            for (var event in config.listeners) {
                var listener = config.listeners[event];
                if (listener && typeof listener == "string") {
                    delete config.listeners[event];
                    if (this.REFRESH_SHORTCUTS[listener]) {
                        config.listeners[event] = this.REFRESH_SHORTCUTS[listener];
                    } else {
                        try {
                            eval("config.listeners[event] = " + listener);
                        } catch(err) {
                        }
                    }
                }
            }
        }
        return config;
    },

    /**
     * Returns the drop targets of this field.
     * @return {CQ.Ext.dd.DropTarget[]} The drop targets
     * @private
     */
    getDropTargets: function() {
        var targets = [];
        try {
            for (var i = 0; i < this.subDropTargets.length; i++) {
                targets.push(this.subDropTargets[i]);
            }
        } catch (e) {
        }
        if (this.elementDropTarget) {
            targets.push(this.elementDropTarget);
        }
        if (this.componentDropTarget && this.componentDropTarget !=
            this.elementDropTarget) {
            targets.push(this.componentDropTarget);
        }
        return targets;
    },

    /**
     * Inserts this element before the passed element in the DOM.
     * @param {Mixed} el The element before which this element will be inserted
     * @private
     */
    insertBefore: function(el) {
        if (this.isContained) {
            var parent = this.element.parent();
            parent.insertBefore(el);
        } else {
            if (this.placeholder) {
                this.placeholder.insertBefore(el);
            }
            this.element.insertBefore(el);
        }
    },

    /**
     * Refreshes the content element of the edit component.
     * @param {String} url (optional) The URL to use for refreshing
     * @param {Boolean} smoothly (optional) If the refreshing should be done smoothly
     * @public
     */
    refresh: function(url, smoothly) {
        // big hack...when called from deleted
        if (this.deleted) {
            if (CQ.wcm.EditRollover.currentlyHighlighted)
                CQ.wcm.EditRollover.currentlyHighlighted.hideHighlight();

            var currentObj = this;
            this.element.hide({"callback": function() {
                if (currentObj.isContained)
                    currentObj.element.parent().remove();

                if (currentObj.remove) currentObj.remove();
            }});

            CQ.Util.runComponentObservation();

            return;
        }
        if (!url) {
            url = this.path + (this.isContainer ? ".editcontext" : "") + CQ.HTTP.EXTENSION_HTML;
        }
        url = CQ.HTTP.noCaching(url);

        if (this.hideHighlight) {
            CQ.wcm.EditRollover.preventNextHighlight = true;
            this.hideHighlight();
        }

        var response = CQ.HTTP.get(url);
        if (CQ.HTTP.isOk(response)) {
            var innerHtml = response.body;

            //there could be several nested editables in element. Top level ones must be created first.
            CQ.utils.WCM.startMakeEditablesQueue();

            this.replaceElement(innerHtml, smoothly);

            if (this.refreshComponent) this.refreshComponent();

            // refresh images below content element
            // todo: check if really not needed anymore since bug #20175 is fixed
//            var images = this.element.dom.getElementsByTagName("img");
//            for (var i = 0; i < images.length; i++) {
//                images[i].src = CQ.HTTP.noCaching(images[i].src);
//            }

            if (CQ.wcm.EditRollover.currentlyHighlighted) {
                CQ.wcm.EditRollover.currentlyHighlighted.hideHighlight();
            }

            CQ.utils.WCM.endMakeEditablesQueue();

            CQ.Util.runComponentObservation();

        }
    },

    replaceElement: function(newElementHTML, smoothly) {
        if (smoothly) {
            var hbckup = this.element.getStyle("height");
            var h = this.element.getHeight();
            if (h > 0) {
                //force height to avoid flickering
                this.element.setHeight(h);
            }
        }

        //first remove all nested editables to avoid JS error and inconsistencies
        var nestedEditables = CQ.WCM.getNestedEditables(this.path);
        for(var i = 0; i < nestedEditables.length; i++) {
            var editable = CQ.WCM.getEditable(nestedEditables[i]);
            if( editable ) {
                editable.remove();
            }
        }

        this.removeSubDropTargets();

        var doReload = false;
        try {
            var insertBeforeElement = "";
            if (CQ.Ext.isIE && newElementHTML.toLowerCase().indexOf("<script") != -1) {
                insertBeforeElement = this.IEScriptInsert;
            }
            this.element.update(insertBeforeElement + newElementHTML);
        } catch(e) {
            // Reload window if there was an error while updating element's HTML.
            // #33064 - JavaScript error while validating Forms start dialog (IE)
            doReload = true;
        }

        CQ.DOM.executeScripts(this.element);

        this.buildSubDropTargets();

        if (doReload) {
            CQ.shared.Util.reload();
        }

        if (smoothly) {
            var that = this;
            this.element.fadeIn({
                callback: function () {
                    var height = that.element.getHeight(),
                        properElement = CQ.Ext.get(that.element.query(".parbase")[0]),
                        properHeight =
                            properElement.getHeight() +
                            properElement.getMargins().bottom +
                            properElement.getMargins().top;
                        //take margins into account

                    if (hbckup && hbckup != "0px") {
                       that.element.setHeight(hbckup);
                    }

                    //adjust to proper height with 'slide' effect
                    if (height !== properHeight) {
                        that.element.animate({
                            height: {to: properHeight}
                        })
                    }
                }
            });
        }
    },

    /**
     * Handles the response after the dialog form submission has failed.
     * @param {CQ.Ext.form.Form} form submitted form
     * @param {Object} dialogResponse The dialog response
     * @private
     */
    failure: function(form, dialogResponse) {
        //        var status = dialogResponse.result["Status"];
        //        var message = dialogResponse.result["Message"];
        //TODO improve messaging
        if (dialogResponse.failureType == "client") {
            CQ.Ext.Msg.alert(CQ.I18n.getMessage("Unknown Error"));
        }
        else {
            CQ.Ext.Msg.minWidth = 500;
            CQ.Ext.Msg.alert(dialogResponse.response.status, dialogResponse.response.responseText);
        }
    },

    /**
     * Handles the response after the dialog form has been successfully submitted.
     * @param {CQ.Ext.form.Form} form submitted form
     * @param {Object} dialogResponse The dialog response
     * @private
     */
    success: function(form, dialogResponse) {
        // get cq:cssClass changes
        var oldField = form.findField("oldCqCssClass");
        var newField = form.findField("./cq:cssClass");

        // override action if path ends with a /*
        if (this.lastAction == CQ.wcm.EditBase.ACTION_INSERT
            || this.path.substring(this.path.length - 2) == "/*") {
            var resourceType = form.findField("./sling:resourceType").getValue();
            var contentPath = dialogResponse.result["Path"];
            if (resourceType && contentPath) {
                var definition = CQ.WCM.getComponentConfig(resourceType);

                if (contentPath && definition) {
                    var url = contentPath + ".html";
                    //this.fireEvent(CQ.wcm.EditBase.EVENT_AFTER_INSERT, this, url, contentPath, definition);

                    this.listenersChecker(definition.config);

                    this.updateCqCssClass(
                        oldField ? oldField.getValue() : "",
                        newField ? newField.getValue() : ""
                    );

                    if (definition.config && definition.config.listeners && definition.config.listeners[CQ.wcm.EditBase.EVENT_AFTER_INSERT]) {
                        definition.config.listeners[CQ.wcm.EditBase.EVENT_AFTER_INSERT].call(this, contentPath, definition);
                    } else {
                        //default behavior
                        this.refreshCreated(contentPath, definition);
                    }
                } else {
                    // fall back to refresh page
                    this.refreshPage();
                }
            } else {
                // fall back to refresh page
                this.refreshPage();
            }
        } else {
            this.updateCqCssClass(
                oldField ? oldField.getValue() : "",
                newField ? newField.getValue() : ""
            );
            // default action: edit
            this.fireEvent(CQ.wcm.EditBase.EVENT_AFTER_EDIT, this);
        }
    },

    /**
     * updates the css class names on this element that are usually set by
     * the component includer and need a dynamic update after a modification.
     *
     * @param {String} oldCls the old class names
     * @param {String} newCls the new class names
     */
    updateCqCssClass: function(oldCls, newCls) {
        if (oldCls == newCls) {
            return;
        }
        if (oldCls) {
            this.element.removeClass(oldCls.split(' '));
        }
        if (newCls) {
            this.element.addClass(newCls.split(' '));
        }
    },

    /**
     * Translates the strings from the config to be translated.
     * @param {Object} config The config object
     * @private
     */
    initI18n: function(config) {
        this.editText = config.editText ? config.editText : CQ.I18n.getMessage("Edit");
        this.deleteText = config.deleteText ? config.deleteText : CQ.I18n.getMessage("Delete");
        this.insertText = config.insertText ? config.insertText : CQ.I18n.getMessage("New...");
        this.cutText = config.copyText ? config.copyText : CQ.I18n.getMessage("Cut");
        this.copyText = config.copyText ? config.copyText : CQ.I18n.getMessage("Copy");
        this.pasteText = config.pasteText ? config.pasteText : CQ.I18n.getMessage("Paste");
        this.referenceText = config.referenceText ? config.referenceText : CQ.I18n.getMessage("Refer");
        this.annotateText = config.annotateText ? config.annotateText : CQ.I18n.getMessage("Annotate");
        this.targetText = config.targetText ? config.targetText : CQ.I18n.getMessage("Target", null, "Button to enable targeting of a component");
        this.untargetText = config.untargetText ? config.untargetText : CQ.I18n.getMessage("Disable targeting");
        this.experiencesText = config.experiencesText ? config.experiencesText : CQ.I18n.getMessage("Experiences...");
    },

    /**
     * Checks if this component can be removed from its container (i.e. if it can have a "Delete" option).
     * It does so by checking if the component's parent is a container. Only components in a container (such as parsys/) can be removed.
     * @returns {boolean} True if the component is removable, false otherwise.
     */
    isRemovable: function() {
        if (this.getResourceType() == CQ.wcm.EditBase.PARSYS_NEW
            || this.getResourceType() == CQ.wcm.EditBase.TARGET_PARSYS_END) {
            // if it's a parsys placeholder then we cannot delete it.
            return false;
        }
        var targetWrapper = this.getTargetParent();
        var parent = (targetWrapper == null) ?
            this.getParentFromDOM(): targetWrapper.getParentFromDOM();
        //if the parent is a container then we can delete stuff from it.
        return parent ? parent.isContainer : false;
    },

    /**
     * Applies the given defaults to the given config object.
     * @param {Object} config The config object
     * @param {Object} defaults The defaults
     * @private
     */
    applyConfigDefaults: function(config, defaults) {
        config = CQ.Util.applyDefaults(config, defaults);

        var targetingActionsAdded = false;

        // BEGIN SPECIAL NOTE
        // this function is called BEFORE the component is fully constructed in its final form
        // and all the data is only present in the "config" parameter yet; however, the function
        // getTargetAncestor() and the funcs it calls expect the final component structure.
        // to avoid that complexity of making them all work in both ways, we temporarily fake
        // the final component structure here for the parts needed by those functions and revert
        // it afterwards.

        // Note: all this hack could go away if we do
        //     this.element = CQ.Ext.get(config.element);
        // in the constructors (EditRollover, EditBar, etc.) *before* the super constructor is
        // called and extjs handles the config object. Also, we'd to remove the use of initialConfig
        // in getResourceType() (and co.) and store things (early) in its own stable properties.

        this.initialConfig = config;
        this.element = {dom: config.element};

        // find out if this component is targeted
        var isTargeted = (this.getTargetAncestor() != null);

        // if this component is in a target wrapper we need to trim down our default context menu
        // the targeting specific actions will be added later (scroll down a bit)
        if (this.getTargetParent()
            && !(this.getParent(config) && this.getParent(config).isContainer)) {

            // clone the original array so we don't break the global "actions"
            var actionsClone = config.actions.slice();
            //remove the Copy-Cut-Paste combo
            if (actionsClone.indexOf(CQ.wcm.EditBase.COPYMOVE) !== -1) {
                actionsClone.splice(actionsClone.indexOf(CQ.wcm.EditBase.COPYMOVE), 1);
            }
            // we don't need the "New..." action unless it's a parsys
            if (actionsClone.indexOf(CQ.wcm.EditBase.INSERT) !== -1
                && this.getResourceType() !== CQ.wcm.EditBase.PARSYS_NEW) {
                actionsClone.splice(actionsClone.indexOf(CQ.wcm.EditBase.INSERT, 1));
            }
            //remove the trailing separator (for aestethic reasons)
            if (actionsClone.lastIndexOf("-") == actionsClone.length - 1) {
                actionsClone.splice(actionsClone.lastIndexOf("-"), 1);
            }
            config.actions = actionsClone;
        }

        // add "Delete" to the list of context menu options
        if (isTargeted && this.isRemovable() && config.actions.indexOf(CQ.wcm.EditBase.DELETE) == -1) {
            config.actions.push(CQ.wcm.EditBase.DELETE);
        }

        delete this.initialConfig;
        delete this.element;
        // END SPECIAL NOTE

        // find out which container type to use
        var container = config[config["container"]];

        // find out which control type to use
        var ctrlDef = config[config["ctrlDef"]];

        // handle buttons
        if (config["actions"]) {
            var finalActionArray = [];
            if (typeof config["actions"] == "string") {
                // actions: CQ.wcm.EditBase.EDIT  =>  actions: [CQ.wcm.EditBase.EDIT]
                config["actions"] = [config["actions"]];
            }
            container.items = [];
            for (var i = 0; i < config["actions"].length; i++) {
                var anActionConfig = config["actions"][i];
                var actionArray = [];

                if (anActionConfig instanceof Array || CQ.Ext.isArray(anActionConfig)) {
                    actionArray = anActionConfig;
                } else {
                    actionArray = [anActionConfig];
                }
                for (var j = 0; j < actionArray.length; j++) {
                    var currentAction = actionArray[j];
                    if (typeof currentAction == "string" && currentAction.indexOf("CQ.wcm.EditBase") == 0) {
                        //string may be one of the CQ.wcm.EditBase.* actions
                        //in that case, an eval is required
                        try {
                            currentAction = eval(currentAction);
                        } catch(error) {}
                    }
                    finalActionArray.push(currentAction);
                    if (typeof currentAction == "string") {
                        if (currentAction == CQ.wcm.EditBase.EDIT) {
                            var editButton = this.getEditConfig();
                            editButton = CQ.Util.applyDefaults(editButton, ctrlDef);
                            container.items.push(editButton);

                            // "Target" et. al. should only be available in edit mode
                            if (CQ.WCM.isEditMode()) {
                                this.addTargetingActions(container.items, ctrlDef, isTargeted, config);
                                targetingActionsAdded = true;
                            }

                        } else if (currentAction == CQ.wcm.EditBase.DELETE) {
                            var deleteButton = this.getDeleteConfig();
                            deleteButton = CQ.Util.applyDefaults(deleteButton, ctrlDef);
                            container.items.push(deleteButton);
                        } else if (currentAction == CQ.wcm.EditBase.INSERT) {
                            var insertButton = this.getInsertConfig();
                            insertButton = CQ.Util.applyDefaults(insertButton, ctrlDef);
                            container.items.push(insertButton);
                            if (config["actions"].indexOf(CQ.wcm.EditBase.COPYMOVE) == -1) {
                                // add paste button for insertion of copied/cut items
                                var pasteButton = this.getPasteConfig();
                                pasteButton = CQ.Util.applyDefaults(pasteButton, ctrlDef);
                                container.items.push(pasteButton);
                                // add reference button
                                //                                var referenceButton = this.getReferenceConfig();
                                //                                referenceButton = CQ.Util.applyDefaults(referenceButton, ctrlDef);
                                //                                container.items.push(referenceButton);
                            }
                        } else if (currentAction == CQ.wcm.EditBase.COPYMOVE) {
                            var cfg = this.getCopyMoveConfig();
                            container.items.push(CQ.Util.applyDefaults(cfg[0], ctrlDef));
                            container.items.push(CQ.Util.applyDefaults(cfg[1], ctrlDef));
                            container.items.push(CQ.Util.applyDefaults(cfg[2], ctrlDef));
                            //                            container.items.push(CQ.Util.applyDefaults(cfg[3], ctrlDef));
                        } else if (currentAction == CQ.wcm.EditBase.ANNOTATE) {
                            var annotateButton = this.getAnnotateConfig();
                            annotateButton = CQ.Util.applyDefaults(annotateButton, ctrlDef);
                            container.items.push(annotateButton);
                        } else {
                            if (this.convertAction) {
                                var converted = this.convertAction(currentAction);
                                if (converted && converted != "") {
                                    container.items.push(converted);
                                }
                            } else {
                                container.items.push(currentAction);
                            }
                        }
                    } else {
                        var button = this.convertAction(currentAction);
                        if (button != null) {
                            //some specific xtype are converted directly to string
                            if (typeof button == "string" && button != "") {
                                container.items.push(button);
                            } else {
                                if (typeof(button.handler) == "string") {
                                    try {
                                        eval("button.handler="+button.handler);
                                        button = CQ.Util.applyDefaults(button, ctrlDef);
                                        container.items.push(button);
                                    } catch(err) {
                                    }
                                } else {
                                    button = CQ.Util.applyDefaults(button, ctrlDef);
                                    container.items.push(button);
                                }
                            }
                        }
                    }
                }
            }
            delete config["actions"];
            config["actions"] = finalActionArray;

            if (CQ.WCM.isEditMode() && !targetingActionsAdded) {
                // for components without an Edit button (which is handled above),
                // for example the parsys/* placeholder, we need to inject the
                // "Experiences" & "Disable targeting" here (but only in edit mode)
                this.addTargetingActions(container.items, ctrlDef, isTargeted, config);
            }
        }
        config["items"] = CQ.Util.applyDefaults(config["items"], [container]);
    },

    addTargetingActions: function(items, ctrlDef, isTargeted, config) {
    	// Added below one line to disable targetting globally for all components
    	config.disableTargeting = true;
        var button;
        if (isTargeted) {
            // for targeted components, add "Experiences" action
            if (config.params["./sling:resourceType"] !== CQ.wcm.EditBase.TARGET_PARSYS_END) {
                button = this.getExperiencesConfig();
                items.push( CQ.Util.applyDefaults(button, ctrlDef) );
            }

            // we can only disable targeting from this component if it's a direct descendant of a targeted component. Otherwise not.
            // This handles the case of the targeted parsys. Components inside a targeted parsys must not have "Disable targeting"
            if (this.getTargetParent()
                && config.params["./sling:resourceType"] !== CQ.wcm.EditBase.PARSYS_NEW
                && !config.isContainer) {
                // add "Disable targeting" action
                button = this.getTargetComponentConfig(true);
                items.push( CQ.Util.applyDefaults(button, ctrlDef) );
            }
        } else if (!config.disableTargeting) {
            // add "Target" action, but only if component allows targeting
            button = this.getTargetComponentConfig(false);
            items.push( CQ.Util.applyDefaults(button, ctrlDef) );
        }
    },

    /**
     * Shows the proper target used (ghost or line).
     * @private
     */
    showTarget: function(dragZone) {
        if( CQ.wcm.EditBase.hideTargetTimeout) {
            window.clearTimeout(CQ.wcm.EditBase.hideTargetTimeout);
        }
        if (this.targetMode && this.targetMode == CQ.wcm.EditBase.TARGET_MODE_LINE) {
            this.showTargetLine();
        } else {
            this.showTargetGhost(dragZone);
        }
    },

    /**
     * Shows the target ghost.
     * @private
     */
    showTargetGhost: function(dragZone) {
        var width = this.element.getWidth();
        var height = CQ.themes.wcm.EditBase.TARGETGHOST_HEIGHT;
        if (dragZone) {
            height = dragZone.getDragData().height;
        }
        if (height < 1)
            height = CQ.themes.wcm.EditBase.TARGETGHOST_HEIGHT;
        else
        if (height > CQ.themes.wcm.EditBase.TARGETGHOST_MAXHEIGHT)
            height = CQ.themes.wcm.EditBase.TARGETGHOST_MAXHEIGHT;

        if( height < CQ.themes.wcm.EditBase.TARGETGHOST_MINHEIGHT) {
            height = CQ.themes.wcm.EditBase.TARGETGHOST_MINHEIGHT;
        }

        var html = "<div></div>";
        var defaultStyles = CQ.DOM.getBlockDefaultStyles();

        var pStyles = CQ.Util.applyDefaults({
            "height": height + "px",
            "width": width + "px"
        }, defaultStyles);

        if( pStyles["bottom"]) {
            //do not know why, bottom = auto has a bad impact on IE. Then just remove it.
            delete pStyles["bottom"];
        }

        if (!CQ.wcm.EditBase.TargetGhost.placeholder) {
            if (this.isContained)
                CQ.wcm.EditBase.TargetGhost.placeholder = CQ.Ext.DomHelper.insertBefore(this.placeholder.parent(), html, true);
            else
                CQ.wcm.EditBase.TargetGhost.placeholder = CQ.Ext.DomHelper.insertBefore(this.placeholder, html, true);
            CQ.wcm.EditBase.TargetGhost.placeholder.setVisibilityMode(CQ.Ext.Element.DISPLAY);
        } else {
            if (this.isContained)
                CQ.wcm.EditBase.TargetGhost.placeholder.insertBefore(this.placeholder.parent());
            else
                CQ.wcm.EditBase.TargetGhost.placeholder.insertBefore(this.placeholder);
        }
        CQ.wcm.EditBase.TargetGhost.placeholder.setStyle(pStyles);
        CQ.wcm.EditBase.TargetGhost.placeholder.addClass(["cq-editcomponent-placeholder","cq-editcomponent-ghost-placeholder"]);

        CQ.wcm.EditBase.TargetGhost.placeholder.show();
        CQ.wcm.EditBase.TargetGhost.render(CQ.Util.ROOT_ID);

        CQ.wcm.EditBase.TargetGhost.el.setStyle("position", "absolute");
        CQ.wcm.EditBase.TargetGhost.el.anchorTo(CQ.wcm.EditBase.TargetGhost.placeholder, "tl", [0, 0], false, null);

        CQ.wcm.EditBase.TargetGhost.observe = function() {
            if (!this.hidden && !CQ.Util.isEqualPosition(this.el.getXY(), this.placeholder.getXY(), 0)) {
                this.el.alignTo(this.placeholder, "tl-tl", [0, 0]);
            }
        };
        CQ.Util.observeComponent(CQ.wcm.EditBase.TargetGhost);

        CQ.wcm.EditBase.TargetGhost.setWidth(width);
        CQ.wcm.EditBase.TargetGhost.setHeight(height);

        CQ.wcm.EditBase.TargetGhost.removeClass("cq-editcomponent-ghost-masking");

        //CQ.wcm.EditBase.TargetGhost.getEl().show(true);
        CQ.wcm.EditBase.TargetGhost.show();

        CQ.Util.runComponentObservation();
    },

    /**
     * Shows the target line.
     * @private
     */
    showTargetLine: function() {
        var width = 0, x = 0, y = 0;
        if (this.element && this.element.isVisible()) {
            width = this.element.getWidth();
            x = this.element.getLeft();
            y = this.element.getTop();
        }

        if (this.placeholder) {
            y = this.placeholder.getTop();
        }

        y -= CQ.themes.wcm.EditBase.TARGETLINE_DISTANCE;

        CQ.wcm.EditBase.TargetLine.setWidth(width);
        CQ.wcm.EditBase.TargetLine.setPosition(x, y);
        CQ.wcm.EditBase.TargetLine.render(CQ.Util.ROOT_ID);
        CQ.wcm.EditBase.TargetLine.show();
    },

    /**
     * Hides the proper target used (ghost or line).
     * @private
     */
    hideTarget: function(delay) {
        this.unmaskTarget();
        var currentObj = this;
        var fct = function() {
            if (currentObj.targetMode && currentObj.targetMode == CQ.wcm.EditBase.TARGET_MODE_LINE) {
                currentObj.hideTargetLine();
            } else {
                currentObj.hideTargetGhost();
            }
            CQ.wcm.EditBase.hideTargetTimeout = null;
        };
        if( delay ) {
            CQ.wcm.EditBase.hideTargetTimeout = window.setTimeout(fct,200);
        } else {
            fct.call(this);
        }
    },

    /**
     * Masks the proper target used (ghost or line).
     * @private
     */
    maskTarget: function(msg) {
        if (this.targetMode && this.targetMode == CQ.wcm.EditBase.TARGET_MODE_LINE) {
            //do nothing
        } else {
            this.maskTargetGhost(msg);
        }
    },

    /**
     * Masks the proper target used (ghost or line).
     * @private
     */
    unmaskTarget: function() {
        if (this.targetMode && this.targetMode == CQ.wcm.EditBase.TARGET_MODE_LINE) {
            //do nothing
        } else {
            this.unmaskTargetGhost();
        }
    },

    /**
     * Hides the target line.
     * @private
     */
    hideTargetLine: function() {
        CQ.wcm.EditBase.TargetLine.hide();
    },

    /**
     * Hides the target ghost.
     * @private
     */
    hideTargetGhost: function() {
        CQ.wcm.EditBase.TargetGhost.hide();
        if (CQ.wcm.EditBase.TargetGhost.placeholder) {
            CQ.wcm.EditBase.TargetGhost.placeholder.hide();
        }

        CQ.Util.cancelObservation(CQ.wcm.EditBase.TargetGhost);

        CQ.Util.runComponentObservation();
    },

    /**
     * Masks the target ghost.
     * @private
     */
    maskTargetGhost: function(msg) {
        if( CQ.wcm.EditBase.TargetGhost.el ) {
            CQ.wcm.EditBase.TargetGhost.addClass("cq-editcomponent-ghost-masking");
            CQ.wcm.EditBase.TargetGhost.el.mask(msg,"x-mask-loading");
        }
    },

    /**
     * Unmasks the target ghost.
     * @private
     */
    unmaskTargetGhost: function() {
        if( CQ.wcm.EditBase.TargetGhost.el && CQ.wcm.EditBase.TargetGhost.el.isMasked()) {
            CQ.wcm.EditBase.TargetGhost.el.unmask();
        }
    },

    /**
     * Returns true if <b>only</b> {@link #EditBase.INSERT} action is defined for the current edit component.
     * @return {Boolean} True if <b>only</b> {@link #EditBase.INSERT} action is defined, else false
     * @public
     **/
    isActionInsertOnly: function() {
        return (this.actions.length == 1 && this.actions[0] == CQ.wcm.EditBase.INSERT);
    },

    /**
     * Returns true if {@link #EditBase.INSERT} action is defined for the current edit component.
     * @return {Boolean} True if {@link #EditBase.INSERT} action is defined, else false
     * @public
     **/
    isActionInsert: function() {
        return (this.actions && this.actions.indexOf(CQ.wcm.EditBase.INSERT) != -1);
    },

    /**
     * Returns true if {@link #EditBase.EDIT} action is defined for the current edit component.
     * @return {Boolean} True if {@link #EditBase.EDIT} action is defined, else false.
     * @public
     **/
    isActionEdit: function() {
        return (this.actions && this.actions.indexOf(CQ.wcm.EditBase.EDIT) != -1);
    },

    /**
     * Returns true if {@link #EditBase.DELETE} action is defined for the current edit component.
     * @return {Boolean} True if {@link #EditBase.DELETE} action is defined, else false
     * @public
     **/
    isActionDelete: function() {
        return (this.actions && this.actions.indexOf(CQ.wcm.EditBase.DELETE) != -1);
    },

    /**
     * Returns true if {@link #EditBase.COPYMOVE} action is defined for the current edit component.
     * @return {Boolean} True if {@link #EditBase.COPYMOVE} action is defined, else false
     * @public
     **/
    isActionCopyMove: function() {
        return (this.actions && this.actions.indexOf(CQ.wcm.EditBase.COPYMOVE) != -1);
    },

    /**
     * Returns if current component and anotherEditComponent parameter have the same one level parent.
     * @param {CQ.wcm.EditBar/CQ.wcm.EditRollover} anotherEditComponent edit component to compare with
     * @return {Boolean} True if components have the same parent, else false
     * @public
     */
    isSameParent: function(anotherEditComponent) {
        if (anotherEditComponent && anotherEditComponent.getParentPath) {
            return (this.getParentPath() == anotherEditComponent.getParentPath());
        }
        return false;
    },

    /**
     * Returns if current component and anotherEditComponent parameter have the same path.
     * @param {CQ.wcm.EditBar/CQ.wcm.EditRollover} anotherEditComponent edit component to compare with
     * @return {Boolean} True if components have the same path, else false
     * @public
     */
    equals: function(anotherEditComponent) {
        if (anotherEditComponent) {
            return (this.path == anotherEditComponent.path);
        }
        return false;
    },

    /**
     * Returns if insert on component of a certain resource type is allowed.
     * @param {String} resourceType Resource type of component to insert
     * @return {Boolean} True if insert is allowed, else false
     * @public
     */
    isInsertAllowed: function(resourceType) {
        if (this.isActionInsert()) {
            var parent = this.getParent();
            if (parent) {
                var cl = CQ.WCM.getComponentList(this.path);
                return cl.isAllowed(resourceType, parent.getCell());
            }
        }
        return false;
    },

    /**
     * Returns if the component is ready (rendered and events attached) or not
     * @return {Boolean} True if component is ready else false
     * @public
     */
    isReady: function() {
        return this.ready;
    },

    /**
     * Builds a drop target for each element retrieved in the dropTarget config property.
     * @private
     */
    buildSubDropTargets: function() {
        // if config contains dropTarget property, setup "sub" drop target with
        // html elements contained in this.element
        if (this.dropTarget) {
            // each drop target describes a component from this
            // element linked to the editComponent
            this.subDropTargets = new Array();
            var i = 0;
            for (; i < this.dropTarget.length; i++) {
                var id = this.dropTarget[i].id;
                var accept = this.dropTarget[i].accept;
                var postParams = this.dropTarget[i].params;
                if (accept && !CQ.Ext.isArray(accept)) {
                    var reg = new RegExp("[ ;]+", "g");
                    accept = accept.split(reg);
                }

                // check if element exists, if not use components fallback element
                var groups = this.dropTarget[i].groups;
                if (groups) {
                    var groupsArray;
                    // group can be a string or an array
                    if (!CQ.Ext.isArray(groups)) {
                        groupsArray = new Array();
                        groupsArray[0] = groups;
                    } else {
                        groupsArray = groups;
                    }

                    id = this.searchDropTargetInCSSClass(id);
                    //if dom element exists
                    if (id != null) {
                        //inherit groups from parent element
                        if (this.elementDropTarget) {
                            if (this.elementDropTarget.groups) {
                                for (var key in this.elementDropTarget.groups) {
                                    if (groupsArray.indexOf(key) == -1) {
                                        groupsArray.push(key);
                                    }
                                }
                            }
                        }

                        //create one drop target for it
                        if (groupsArray.length > 0) {
                            this.subDropTargets[i] = this.dropTargetClass.getInstance(id, this, groupsArray, {
                                propertyName:this.dropTarget[i].name
                            });

                            if (accept) {
                                this.subDropTargets[i].ddAccept = accept;
                            }
                            if (postParams) {
                                this.subDropTargets[i].postParams = postParams;
                            }

                        }
                    } else {
                        //if this dom element does not exist but element has a drop target, add group to this drop target
                        // and to component drop target (for rollover, this is the same object)
                        if (this.elementDropTarget) {
                            var j = 0;
                            for (; j < groupsArray.length; j++) {
                                this.elementDropTarget.addToGroup(groupsArray[j]);
                                this.componentDropTarget.addToGroup(groupsArray[j]);
                            }
                            //TODO check if no better way to do it
                            //also add first propertyName property to element drop target to be able to drop media
                            if (!this.elementDropTarget.propertyName)
                                this.elementDropTarget.propertyName = this.dropTarget[i].name;
                            if (!this.componentDropTarget.propertyName)
                                this.componentDropTarget.propertyName = this.dropTarget[i].name;

                            if (accept) {
                                this.elementDropTarget.ddAccept = accept;
                            }
                            if (postParams) {
                                this.elementDropTarget.postParams = postParams;
                            }
                        }
                    }
                }
            }
        }
    },

    /**
     * Searches for a drop target id contained inside a CSS class from a DOM
     * element of the current component element.
     * @param {String} dropTargetId The drop target id
     * @return {String} Id of the found DOM element, else null
     * @private
     */
    searchDropTargetInCSSClass: function(dropTargetId) {
        if (this.element && this.element.dom) {
            var el = CQ.Ext.DomQuery.selectNode("*[class*=\"cq-dd-" + dropTargetId + "\"]", this.element.dom);
            if (el) {
                if (el.id) {
                    return el.id;
                } else {
                    return CQ.Ext.id(el);
                }
            }
        }
        return null;
    },

    /**
     * Resumes drop targets, ie unlocks componentDropTarget, elementDropTarget and subDropTargets.
     * @private
     */
    resumeDropTargets: function() {
        if (this.componentDropTarget) {
            this.componentDropTarget.unlock();
        }

        if (this.elementDropTarget && this.elementDropTarget !== this.componentDropTarget) {
            this.elementDropTarget.unlock();
        }

        this.resumeSubDropTargets();
    },

    /**
     * Suspends drop targets, ie locks componentDropTarget, elementDropTarget and subDropTargets.
     * @private
     */
    suspendDropTargets: function() {
        if (this.componentDropTarget) {
            this.componentDropTarget.lock();
        }

        if (this.elementDropTarget && this.elementDropTarget !== this.componentDropTarget) {
            this.elementDropTarget.lock();
        }

        this.suspendSubDropTargets();
    },

    /**
     * Resumes all subDropTargets.
     * @private
     */
    resumeSubDropTargets: function() {
        if (this.subDropTargets) {
            var i = 0;
            for (; i < this.subDropTargets.length; i++) {
                this.subDropTargets[i].unlock();
            }
        }
    },

    /**
     * Suspends all subDropTargets.
     * @private
     */
    suspendSubDropTargets: function() {
        if (this.subDropTargets) {
            var i = 0;
            for (; i < this.subDropTargets.length; i++) {
                this.subDropTargets[i].lock();
            }
        }
    },

    /**
     * Removes all drop targets, ie componentDropTarget, elementDropTarget and subDropTargets.
     * @private
     */
    removeDropTargets: function() {
        if (this.componentDropTarget) {
            this.componentDropTarget.lock();
            CQ.Ext.destroy(this.componentDropTarget);
            delete this.componentDropTarget;
        }

        if (this.elementDropTarget && this.elementDropTarget !== this.componentDropTarget) {
            this.elementDropTarget.lock();
            CQ.Ext.destroy(this.elementDropTarget);
            CQ.Ext.destroy(this.componentDropTarget);
            delete this.elementDropTarget;
            delete this.componentDropTarget;
        }

        this.removeSubDropTargets();
    },

    /**
     * Removes subDropTargets.
     * @private
     */
    removeSubDropTargets: function() {
        if (this.subDropTargets) {
            var i = 0;
            for (; i < this.subDropTargets.length; i++) {
                this.subDropTargets[i].lock();
                CQ.Ext.destroy(this.subDropTargets[i]);
                this.subDropTargets.remove(i);
            }
        }
    },

    /**
     * Returns if current object is nested into current highlighted object's DOM.
     * Method is dedicated to EditRollover but also used by EditBar because of nested parsyses.
     * @return {Boolean} true if current object is nested into current highlighted object. False otherwise.
     * @private
     */
    isParentHighlighted: function() {
        if(CQ.wcm.EditRollover.currentlyHighlighted && CQ.wcm.EditRollover.currentlyHighlighted.element) {
            var selectedNode = CQ.wcm.EditRollover.currentlyHighlighted.element.dom;
            var aParentNode = this.element.dom.parentNode;
            while(aParentNode!=null) {
                if(aParentNode==selectedNode) {
                    return true;
                }
                aParentNode = aParentNode.parentNode;
            }
        }
        return false;
    },

    /**
     * Returns true if current object is nested into current highlighted object's DOM.
     * @return {Boolean} True if current object is nested into current highlighted object
     * @private
     * @deprecated Use {@link #isParentHighlighted} instead
     */
    isParentHighLighted: this.isParentHighlighted,

    /**
     * Get thumbnail path.
     * @return {String} thumbnail path
     * @private
     */
    getThumbnailPath: function() {
        //TODO refactor with using componentPath and icon servlet
        // note: currently not in use (EditBaseDD does no longer display the thumbnail)
        if (this.componentPath) {
            return this.componentPath + ".png";
        } else {
            //TODO remove this part. temporary
            var url = null;
            if (this.dialog) {
                if (typeof this.dialog == "string") {
                    url = this.dialog;
                } else {
                    url = this.dialog.url;
                }

                if (url) {
                    var index = url.lastIndexOf("/");
                    if (index != -1) {
                        url = url.substring(0, url.lastIndexOf("/") + 1) + "thumbnail.png";
                    }
                    if (!CQ.HTTP.isOk(CQ.HTTP.get(url))) return "";
                }
            }
            return url;
        }
    },

    /**
     * Get icon path.
     * @return {String} icon path
     * @private
     */
    getIconPath: function() {
        //TODO refactor with using componentPath and icon servlet
        var url = null;
        if (this.dialog) {
            if (typeof this.dialog == "string") {
                url = this.dialog;
            } else {
                url = this.dialog.url;
            }

            if (url) {
                var index = url.lastIndexOf("/");
                if (index != -1) {
                    url = url.substring(0, url.lastIndexOf("/") + 1) + "icon.png";
                }
            }
        }
        return url;
    },

    /**
     * Handles generic (events and properties) live relationship behaviors.
     * @param {Boolean} containerMode True to define component as a container of others live relationships
     * @private
     */
    handleLiveRelationship: function(containerMode) {
        if (this[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP] != null && this.liveStatus == null) {
            if (!this[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP][CQ.wcm.msm.MSM.PARAM_STATUS][CQ.wcm.msm.MSM.PARAM_IS_TARGET_MANUALLY_CREATED] &&
                (this[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP][CQ.wcm.msm.MSM.PARAM_STATUS][CQ.wcm.msm.MSM.PARAM_IS_SOURCE_EXISTING]
                    || this[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP][CQ.wcm.msm.MSM.PARAM_STATUS][CQ.wcm.msm.MSM.PARAM_IS_SOURCE_DELETED])) {

                this.enableLiveRelationship = true;
                this.liveStatusContainerMode = (containerMode === true);
                this.liveStatusLocked = !this[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP][CQ.wcm.msm.MSM.PARAM_STATUS][CQ.wcm.msm.MSM.PARAM_IS_CANCELLED];

                //                this.on(CQ.wcm.EditBase.EVENT_AFTER_EDIT,function() {
                //                    if (this.liveStatusLocked) {
                //                        this.doSwitchLock();
                //                    }
                //                },this);

                this.on(CQ.wcm.EditBase.EVENT_AFTER_MOVE, function() {
                    var parent = this.getParent();
                    if (parent) {
                        if (parent.liveStatusLocked) {
                            parent.doSwitchLock();
                        }
                    }
                }, this);

                //                this.on(CQ.wcm.EditBase.EVENT_AFTER_CHILD_INSERT,function() {
                //                    if(this.liveStatusLocked) {
                //                        this.doSwitchLock();
                //                    }
                //                },this);
            }
        }
    },

    /**
     * Requests user input to switch the live relationship lock.
     * @param {CQ.Dialog} aDialog (optional) dialog to update
     * @private
     */
    switchLock: function(aDialog) {
        CQ.Ext.Msg.confirm(
            this.liveStatusLocked ? CQ.I18n.getMessage("Cancel inheritance") : CQ.I18n.getMessage("Revert inheritance"),
            this.liveStatusLocked ? CQ.I18n.getMessage("Do you really want to cancel the inheritance?") : CQ.I18n.getMessage("Do you really want to revert the inheritance?"),
            function(btnId) {
                if (btnId == "yes") {
                    this.doSwitchLock(aDialog);
                } else {
                    aDialog.setEditLock(this.liveStatusLocked, false, true);
                }
            },
            this
        );
    },

    /**
     * Executes th switch the live relationship lock.
     * @param {CQ.Dialog} aDialog (optional) dialog to update
     * @private
     */
    doSwitchLock: function(aDialog) {
        var params = {};
        params[ CQ.wcm.msm.MSM.PARAM_STATUS + "/" + CQ.wcm.msm.MSM.PARAM_IS_CANCELLED ] = this.liveStatusLocked;
        // deepCancel = true if component is not container and false if component is container
        this.deepCancel = !this.isContainer;
        params[ CQ.wcm.msm.MSM.PARAM_STATUS + "/" + CQ.wcm.msm.MSM.PARAM_IS_CANCELLED_FOR_CHILDREN ] = this.deepCancel;

        var serverResponse = CQ.utils.HTTP.post(this.path + ".msm.conf", null, params, this);

        if (CQ.utils.HTTP.isOk(serverResponse)) {
            this.liveStatusLocked = !this.liveStatusLocked;
            if (aDialog && aDialog.setEditLock) {
                aDialog.setEditLock(this.liveStatusLocked, false, true);
            }
            var uh, undoStep;
            var undoWarning = CQ.I18n.getMessage("Unfortunately, this is not possible.");
            var failWarning = CQ.I18n.getMessage("Future undo or redo operations that address this paragraph may fail ungracefully.");
            // if re-enabled, reload component
            if (this.liveStatusLocked) {
                if (CQ.undo.UndoManager.isEnabled()) {
                    uh = CQ.undo.UndoManager.getHistory();
                    undoStep = uh.createUndoStep(uh.createStepConfig());
                    undoStep.addUndoAction(new CQ.undo.actions.CannotUndoAction(
                        CQ.I18n.getMessage("You're trying to undo reverting the inheritance for paragraph")
                            + "<br>" + this.path + "<br>" + undoWarning + "<br>" + failWarning,
                        CQ.I18n.getMessage("You're trying to redo reverting the inheritance for paragraph")
                            + "<br>" + this.path + "<br>" + undoWarning + "<br>" + failWarning));
                    undoStep.commit();
                }
                if( this.getResourceType() ==  "wcm/msm/components/ghost") {
                    //restoring a ghost from which source parent has been deleted might generate one of the 2 following cases
                    // 1: restore info have been found, restored resource type
                    // 2: no info found, paragraph deleted
                    if( serverResponse.headers && serverResponse.headers["Message"] ) {
                        var msg = undefined;
                        if( serverResponse.headers["Message"] == "ghost#cleanedup") {
                            msg = CQ.I18n.getMessage("Source paragraph was not found. Paragraph was restored as it was before deletion and is now only available on local Live Copy page.");
                        } else {
                            if( serverResponse.headers["Message"] == "ghost#deleted") {
                                msg = CQ.I18n.getMessage("Source paragraph was not found and no restore information was found. Paragraph has been deleted.");
                            }
                        }
                        if ( msg ) {
                            CQ.Ext.Msg.alert(CQ.I18n.getMessage("Orphaned, deleted paragaph"),msg,function() {
                                this.refreshPage();
                            },this);
                        } else {
                            this.refreshPage();
                        }
                    }
                } else {
                    // todo: handle better. reloadSelf() would be sufficient, but
                    // component might change edit layout (eg. buttons, editbar/rollovers)
                    this.refreshPage();
                }
            } else {
                if (CQ.undo.UndoManager.isEnabled()) {
                    uh = CQ.undo.UndoManager.getHistory();
                    undoStep = uh.createUndoStep(uh.createStepConfig());
                    undoStep.addUndoAction(new CQ.undo.actions.CannotUndoAction(
                        CQ.I18n.getMessage("You're trying to undo cancelling the inheritance for paragraph")
                            + "<br>" + this.path + "<br>" + undoWarning,
                        CQ.I18n.getMessage("You're trying to redo cancelling the inheritance for paragraph")
                            + "<br>" +this.path + "<br>" + undoWarning));
                    undoStep.commit();
                }
                var nestedEditables = CQ.WCM.getNestedEditables(this.path);
                if( this.deepCancel && nestedEditables.length > 0) {
                    //a deep cancel will generate a cancel on all nested paragraphs. Just refresh the page.
                    this.refreshPage();
                } else {
                    if (this.handleLiveStatus) {
                        this.handleLiveStatus();
                        if (aDialog && aDialog.setEditLock) {
                            aDialog.setEditLock(this.liveStatusLocked);
                        }
                    }
                }
            }
        }
    },

    getClsPath: function(prefix) {
        if (!this.clsPath) {
            var str = "jcr:content";
            this.clsPath = this.path.substring(this.path.lastIndexOf(str) + str.length + 1);
            this.clsPath = CQ.DOM.encodeClass(this.clsPath, "");
        }
        return prefix + "-" + this.clsPath;
    },

    /**
     * Returns the design cell of this component
     * @return {CQ.wcm.Cell} the cell
     */
    getCell: function() {
        if (!this.cell && this.cellSearchPath) {
            this.cell = new CQ.wcm.Cell(this.cellSearchPath);
        }
        return this.cell;
    },

    /**
     * Handles an "out of area" click while inplace editing is active.
     * @private
     */
    inplaceEditingOutOfAreaClick: function() {
        var comp = window.CQ_inplaceEditComp;
        var isLocked = (window.CQ_inplaceEditDialog === true);
        if (comp && !isLocked) {
            // if the click was outside a component, finish inplace editing
            comp.finishInplaceEditing();
        }
    },

    /**
     * Starts inplace editing for the component if inplace editing is actually enabled for
     * it.
     */
    startInplaceEditing: function() {
        if (this.fireEvent(CQ.wcm.EditBase.EVENT_BEFORE_EDIT, this) === false) {
            return;
        }
        var isAvailable = (this.inplaceEditingConfig && this.inplaceEditingConfig.active)
            && (CQ.Ext.isIE || (CQ.Ext.isGecko && !CQ.Ext.isGecko2) || CQ.Ext.isWebKit);
        if (isAvailable) {
            var root = CQ.Util.getRoot();
            var el = CQ.Ext.get(this.element);
            var elPos = el.getXY();
            var x = elPos[0];
            var y = elPos[1];
            var size = el.getSize();
            var w = size.width;
            var h = size.height;
            var div = CQ.Ext.DomHelper.createDom({
                "tag": "div",
                "style": "position: absolute; left: " + x + "px; top: " + y + "px; "
                    + "width: " + w + "px; height: " + h + "px;"
            });
            root.dom.appendChild(div);
            var loadMask = new CQ.Ext.LoadMask(CQ.Ext.get(div), {
                "removeMask": true,
                "rootDiv": div
            });
            loadMask.enable();
            loadMask.show();
            if (this.inplaceEditor == null) {
                var editorType = this.inplaceEditingConfig.editorType;
                if (editorType != null) {
                    this.inplaceEditor = CQ.ipe.InplaceEditing.create(editorType);
                }
                if (this.inplaceEditor == null) {
                    this.handleInplaceEditingInitError(
                        CQ.I18n.getMessage("There is no suitable editor registered for inline editing.<br>Please check your edit configuration."),
                        loadMask,
                        editorType === "image" || editorType === "textimage"
                    );
                } else {
                    this.inplaceEditor.loadEditorConfig(this.inplaceEditingConfig, {
                        "onSuccess": function() {
                            this.inplaceEditor.init();
                            this.loadInplaceContentAsync(loadMask);
                        },
                        "onFailure": function() {
                            this.handleInplaceEditingInitError(null, loadMask);
                        },
                        "scope": this
                    });
                }
            } else {
                // if no config has to be loaded, we can directly start the editor
                this.loadInplaceContentAsync(loadMask);
            }
        }
    },

    /**
     * Reloads the content from server before editing (see bug #30222)
     * @private
     */
    loadInplaceContentAsync: function(loadMask) {
        var url = this.path + ".0" + CQ.HTTP.EXTENSION_JSON;
        CQ.HTTP.get(url, function(options, success, response) {
            if (success) {
                var prop = this.inplaceEditor.getProperty();
                if (prop.indexOf("./") == 0) {
                    prop = prop.substring(2);
                }
                this.startInplaceEditorAsync(CQ.HTTP.eval(response)[prop] || "", loadMask);
            } else {
                this.handleInplaceEditingInitError(
                    CQ.I18n.getMessage("Could not load content from server."),
                    loadMask);
            }
        }, this);
    },

    /**
     * Handler that prevents clicks on an inplace edited element bubbling up in several edge
     * cases (CQ5-27010)
     * @private
     */
    _ipeClickHandler: function(e) {
        e.stopPropagation();
    },

    /**
     * Asynchroneous part of {@link #startInplaceEditing}.
     * @private
     */
    startInplaceEditorAsync: function(content, loadMask) {
        if (loadMask) {
            loadMask.hide();
            loadMask.rootDiv.parentNode.removeChild(loadMask.rootDiv);
        }
        // handle missing inheritance issues
        if (this._startInplaceEditing) {
            this._startInplaceEditing();
        }
        this.isInplaceEdited = true;
        window.CQ_inplaceEditComp = this;
        this.inplaceEditor.start(this, this.element, content);
        this.element.on("click", this._ipeClickHandler);
        // register our own click handler, as using CQ.WCM#clearSelection has
        // sideeffects when CQ.WCM#deselect is called while inplace editing takes place
        CQ.Ext.EventManager.on(document.body, "click", this.inplaceEditingOutOfAreaClick);
    },

    /**
     * Handling errors while initializing inplace editing.
     * @private
     */
    handleInplaceEditingInitError: function(errObj, loadMask, silent) {
        if (loadMask) {
            loadMask.hide();
            loadMask.rootDiv.parentNode.removeChild(loadMask.rootDiv);
        }
        if (silent) {
            return;
        }

        var msg = ((typeof(errObj) == "string") ? errObj
            : CQ.I18n.getMessage("Could not load inplace editing configuration."));
        CQ.Notification.notify(msg);
    },

    /**
     * Finishes inplace editing (if inplace editing is currently active). Changed content
     * will be persisted.
     */
    finishInplaceEditing: function() {
        if (this.isInplaceEdited) {
            this.element.un("click", this._ipeClickHandler);
            CQ.Ext.EventManager.un(document.body, "click",
                this.inplaceEditingOutOfAreaClick);
            // handle missing inheritance issues
            if (this._finishInplaceEditing) {
                this._finishInplaceEditing();
            }
            this.inplaceEditor.finish();
            this.isInplaceEdited = false;
            window.CQ_inplaceEditComp = null;
        }
    },

    /**
     * Cancels inplace editing (if inplace editing is currently active). Changed content
     * will be reverted.
     */
    cancelInplaceEditing: function() {
        if (this.isInplaceEdited) {
            this.element.un("click", this._ipeClickHandler);
            CQ.Ext.EventManager.un(document.body, "click",
                this.inplaceEditingOutOfAreaClick);
            // handle missing inheritance issues
            if (this._cancelInplaceEditing) {
                this._cancelInplaceEditing();
            }
            this.inplaceEditor.cancel();
            this.isInplaceEdited = false;
            window.CQ_inplaceEditComp = null;
        }
    },

    isInplaceEditingDropAllowed: function(dragZone) {
        if (this.inplaceEditor) {
            return this.inplaceEditor.isDropAllowed(dragZone);
        }
        return false;
    },

    notifyInplaceEditingDrop: function(dragZone) {
        if (this.inplaceEditor) {
            this.inplaceEditor.notifyDrop(dragZone);
        }
    },

    hideDialogListener: function(window) {
        //properly remove listeners in Window added by anchorTo method. Extjs bug or bad implementation
        CQ.Util.cancelObservation(window);
        CQ.wcm.EditBase.unRegisterInlineDialog(window);
        this.showElement();
        this.refreshComponent();
        if (this.enableDrag) {
            this.enableDrag();
        }
    },

    hideDialogListenerToResumeDropTargets: function(window) {
        this.resumeDropTargets();
    },

    resizeDialogListener: function(window, width, height) {
        this.getInlinePlaceholder().setHeight(height + this.getInlinePlaceholderInitialHeight() + CQ.themes.wcm.EditBase.INLINE_BOTTOM_PADDING);
    }

};

/**
 * Loading text displayed when a paragraph is inserted.
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.INSERTING_PARAGRAPH = CQ.I18n.getMessage("Inserting paragraph...");

/**
 * Constant for inserting a new component before another one.
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.INSERT_BEFORE = "before";

/**
 * Constant for inserting a new component after another one.
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.INSERT_AFTER = "after";

/**
 * Constant for inserting a new component at the end.
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.INSERT_LAST = "";

/**
 * Internal constant for edit mode.
 * @private
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.ACTION_EDIT = "EDIT";

/**
 * Internal constant for insert mode.
 * @private
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.ACTION_INSERT = "INSERT";

/**
 * The value for {@link #actions} to create an edit control. Usages:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.EDIT
 }
 var config = {
    actions: [
        CQ.wcm.EditBase.EDIT,
        {
            text: "Custom Button",
            handler: ...
        }
    ]
 }
 </code></pre>
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.EDIT = "EDIT";

/**
 * The value for {@link #actions} to create a delete control. Usages:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.DELETE
 }
 var config = {
    actions: [
        CQ.wcm.EditBase.DELETE,
        {
            text: "Custom Button",
            handler: ...
        }
    ]
 }
 </code></pre>
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.DELETE = "DELETE";

/**
 * The value for {@link #actions} to create an insert control. Usages:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.INSERT
 }
 var config = {
    actions: [
        CQ.wcm.EditBase.INSERT,
        {
            text: "Custom Button",
            handler: ...
        }
    ]
 }
 </code></pre>
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.INSERT = "INSERT";

/**
 * The value for {@link #actions} to create an annotate control. Usages:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.ANNOTATE
 }
 var config = {
    actions: [
        CQ.wcm.EditBase.ANNOTATE,
        {
            text: "Custom Button",
            handler: ...
        }
    ]
 }
 </code></pre>
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.ANNOTATE = "ANNOTATE";

/**
 * Resource type of wrapper component used for targeting.
 * @static
 * @final
 * @type {String}
 */
CQ.wcm.EditBase.TARGET_COMPONENT = "cq/personalization/components/target";

CQ.wcm.EditBase.TARGET_PARSYS_END = "cq/personalization/components/targetparsys/end";
/**
 * Resource type of the parsys placeholder.
 * @static
 * @final
 * @type {string}
 */
CQ.wcm.EditBase.PARSYS_NEW = "foundation/components/parsys/new";
/**
 * The value for {@link #actions} to create a copy control. Usages:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.COPYMOVE
 }
 var config = {
    actions: [
        CQ.wcm.EditBase.COPYMOVE,
        {
            text: "Custom Button",
            handler: ...
        }
    ]
 }
 </code></pre>
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.COPYMOVE = "COPYMOVE";

/**
 * The value for {@link #actions} to create an edit and delete control.
 * Usage:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.EDITDELETE
 }
 </code></pre>
 * @static
 * @final
 * @type String[]
 */
CQ.wcm.EditBase.EDITDELETE = [
    CQ.wcm.EditBase.EDIT,
    "-",
    CQ.wcm.EditBase.DELETE
];

/**
 * The value for {@link #actions} to create an edit and annotate control.
 * Usage:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.EDITANNOTATE
 }
 </code></pre>
 * @static
 * @final
 * @type String[]
 */
CQ.wcm.EditBase.EDITANNOTATE = [
    CQ.wcm.EditBase.EDIT,
    CQ.wcm.EditBase.ANNOTATE
];

/**
 * The value for {@link #actions} to create an edit, delete and annotate control.
 * Usage:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.EDITANNOTATEDELETE
 }
 </code></pre>
 * @static
 * @final
 * @type String[]
 */
CQ.wcm.EditBase.EDITANNOTATEDELETE = [
    CQ.wcm.EditBase.EDIT,
    CQ.wcm.EditBase.ANNOTATE,
    "-",
    CQ.wcm.EditBase.DELETE
];

/**
 * The value for {@link #actions} to create an edit, annotate, delete, copy and insert control.
 * Usage:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.EDITANNOTATECOPYMOVEDELETEINSERT
 }
 </code></pre>
 * @static
 * @final
 * @type String[]
 */
CQ.wcm.EditBase.EDITANNOTATECOPYMOVEDELETEINSERT = [
    CQ.wcm.EditBase.EDIT,
    CQ.wcm.EditBase.ANNOTATE,
    "-",
    CQ.wcm.EditBase.COPYMOVE,
    CQ.wcm.EditBase.DELETE,
    "-",
    CQ.wcm.EditBase.INSERT
];

/**
 * The value for {@link #actions} to create an edit, delete, copy and insert control.
 * Usage:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.EDITCOPYMOVEDELETEINSERT
 }
 </code></pre>
 * @static
 * @final
 * @type String[]
 */
CQ.wcm.EditBase.EDITCOPYMOVEDELETEINSERT = [
    CQ.wcm.EditBase.EDIT,
    "-",
    CQ.wcm.EditBase.COPYMOVE,
    CQ.wcm.EditBase.DELETE,
    "-",
    CQ.wcm.EditBase.INSERT
];

/**
 * The value for {@link #actions} to create an edit, annotate, copy and insert control.
 * Usage:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.EDITANNOTATECOPYMOVEINSERT
 }
 </code></pre>
 * @static
 * @final
 * @type String[]
 */
CQ.wcm.EditBase.EDITANNOTATECOPYMOVEINSERT = [
    CQ.wcm.EditBase.EDIT,
    CQ.wcm.EditBase.ANNOTATE,
    "-",
    CQ.wcm.EditBase.COPYMOVE,
    "-",
    CQ.wcm.EditBase.INSERT
];

/**
 * The value for {@link #actions} to create an edit, copy and insert control.
 * Usage:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.EDITCOPYMOVEINSERT
 }
 </code></pre>
 * @static
 * @final
 * @type String[]
 */
CQ.wcm.EditBase.EDITCOPYMOVEINSERT = [
    CQ.wcm.EditBase.EDIT,
    "-",
    CQ.wcm.EditBase.COPYMOVE,
    "-",
    CQ.wcm.EditBase.INSERT
];

/**
 * The value for {@link #actions} to create an edit, annotate, delete and insert control.
 * Usage:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.EDITANNOTATEDELETEINSERT
 }
 </code></pre>
 * @static
 * @final
 * @type String[]
 */
CQ.wcm.EditBase.EDITANNOTATEDELETEINSERT = [
    CQ.wcm.EditBase.EDIT,
    CQ.wcm.EditBase.ANNOTATE,
    "-",
    CQ.wcm.EditBase.DELETE,
    "-",
    CQ.wcm.EditBase.INSERT
];

/**
 * The value for {@link #actions} to create an edit, delete and insert control.
 * Usage:
 * <pre><code>
 var config = {
    actions: CQ.wcm.EditBase.EDITDELETEINSERT
 }
 </code></pre>
 * @static
 * @final
 * @type String[]
 */
CQ.wcm.EditBase.EDITDELETEINSERT = [
    CQ.wcm.EditBase.EDIT,
    "-",
    CQ.wcm.EditBase.DELETE,
    "-",
    CQ.wcm.EditBase.INSERT
];

/**
 * Name of the annotations folder.
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.ANNOTATIONS = "cq:annotations";


/**
 * Name of event to be fired after successfully inserting a new component instance.
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_AFTER_INSERT = "afterinsert";

/**
 * Name of event to be fired before moving.
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_BEFORE_MOVE = "beforemove";

/**
 * Name of event to be fired after successfully moving.
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_AFTER_MOVE = "aftermove";

/**
 * Name of event to be fired before copying.
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_BEFORE_COPY = "beforecopy";

/**
 * Name of event to be fired after successfully copying.
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_AFTER_COPY = "aftercopy";

/**
 * Name of event to be fired before editing a component instance .
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_BEFORE_EDIT = "beforeedit";

/**
 * Name of event to be fired after successfully editing a component instance .
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_AFTER_EDIT = "afteredit";

/**
 * Name of event to be fired before deleting a component instance.
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_BEFORE_DELETE = "beforedelete";

/**
 * Name of event to be fired after successfully deleting a component instance.
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_AFTER_DELETE = "afterdelete";

/**
 * Name of event to be fired before inserting a child component instance.
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_BEFORE_CHILD_INSERT = "beforechildinsert";

/**
 * Name of event to be fired after successfully insert a child component instance.
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_AFTER_CHILD_INSERT = "afterchildinsert";

/**
 * Name of event to be fired when rendering component.
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_RENDER = "render";

/**
 * Name of event to be fired when component is ready (rendered and events attached).
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_READY = "ready";

/**
 * Name of event to be fired when updating a component list.
 * @static
 * @final
 * @type String
 * @private
 */
CQ.wcm.EditBase.EVENT_UPDATE_COMPONENTLIST = "updatecomponentlist";

/**
 * List of all events.
 * @static
 * @final
 * @type Array
 * @private
 */
CQ.wcm.EditBase.EVENTS_LIST = [
    CQ.wcm.EditBase.EVENT_BEFORE_COPY,
    CQ.wcm.EditBase.EVENT_BEFORE_DELETE,
    CQ.wcm.EditBase.EVENT_BEFORE_EDIT,
    CQ.wcm.EditBase.EVENT_BEFORE_MOVE,
    CQ.wcm.EditBase.EVENT_BEFORE_CHILD_INSERT,
    CQ.wcm.EditBase.EVENT_AFTER_INSERT,
    CQ.wcm.EditBase.EVENT_AFTER_COPY,
    CQ.wcm.EditBase.EVENT_AFTER_DELETE,
    CQ.wcm.EditBase.EVENT_AFTER_EDIT,
    CQ.wcm.EditBase.EVENT_AFTER_MOVE,
    CQ.wcm.EditBase.EVENT_RENDER,
    CQ.wcm.EditBase.EVENT_AFTER_CHILD_INSERT,
    CQ.wcm.EditBase.EVENT_UPDATE_COMPONENTLIST
];

/**
 * Inline editing mode: auto. See {@link #inlineEditing}.
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.INLINE_MODE_AUTO = "auto";

/**
 * Inline editing mode: never. See {@link #inlineEditing}.
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.INLINE_MODE_NEVER = "never";

/**
 * Inline editing mode: forced. See {@link #inlineEditing}.
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.INLINE_MODE_FORCED = "forced";

/**
 * The resource type of the reference component.
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.REFERENCE_COMPONENT = "foundation/components/reference";

/**
 * The path property name of the reference component.
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.REFERENCE_COMPONENT_PATH_PROPERTY = "./path";

/**
 * Shows the dialog for the given edit component.
 * @static
 * @param {CQ.wcm.EditBar/CQ.wcm.EditRollover} editComponent The edit component
 * @param {String} type (optional) The type of dialog
 * @param {Boolean} ignoreIsContainer (optional) True to ignore the cq:isContainer
 *        property (and always take the the parent editing as permission target)
 */
CQ.wcm.EditBase.showDialog = function(editComponent, type, ignoreIsContainer) {
    if (!editComponent) {
        return;
    }
    var dialog;
    if (type && type == CQ.wcm.EditBase.INSERT) {
        dialog = editComponent.getInsertDialog(ignoreIsContainer);
        dialog.processPath(editComponent.path);
    } else {
        if (editComponent.fireEvent(CQ.wcm.EditBase.EVENT_BEFORE_EDIT, editComponent) === false) {
            return;
        }
        dialog = editComponent.getEditDialog();
        dialog.loadContent(editComponent.path);

        if (editComponent.enableLiveRelationship) {
            var fct = function() {
                editComponent.switchLock(dialog);
            };

            dialog.on("beforeeditlocked", fct);
            dialog.on("beforeeditunlocked", fct);

            dialog.on("beforeshow", function() {
                dialog.editLock = this.liveStatusLocked;
            }, editComponent);
        }

        if (dialog.hidden && editComponent.element && editComponent.element.getWidth() > editComponent.getInlineConfig().size && !CQ.wcm.EditBase.isInlineDialogChildOpened(editComponent.path)) {
            var inlinePlaceholder = editComponent.getInlinePlaceholder();
            if (inlinePlaceholder) {
                var inlinePlaceholderIntialHeight = editComponent.getInlinePlaceholderInitialHeight();

                //hide element but keep parent to display inlineplaceholder
                editComponent.hideElement(true);

                dialog.setWidth(inlinePlaceholder.getWidth());
                dialog.anchorTo(inlinePlaceholder, "tl", [0, inlinePlaceholderIntialHeight], true);

                dialog.on("resize", editComponent.resizeDialogListener, editComponent);
                dialog.on("hide", editComponent.hideDialogListener, editComponent);

                dialog.anchoredTo = editComponent;
                CQ.Util.observeComponent(dialog);

                inlinePlaceholder.setHeight(dialog.getFrameHeight() + dialog.getInnerHeight() + inlinePlaceholder.getHeight() + CQ.themes.wcm.EditBase.INLINE_BOTTOM_PADDING);

                if (editComponent.disableDrag) {
                    editComponent.disableDrag();
                }

                CQ.wcm.EditBase.registerInlineDialog(dialog);

                dialog.disableOverridePosition = true;
            }
        }

    }
    CQ.WCM.deselect(); // clear current selection
    dialog.show();

    editComponent.suspendDropTargets();
    dialog.on("hide", editComponent.hideDialogListenerToResumeDropTargets, editComponent);
};

/**
 * Builds the {@link CQ.wcm.EditBase.TargetGhost} object
 * @return {CQ.wcm.EditBase.TargetGhost} constructed target ghost
 * @static
 * @private
 */
CQ.wcm.EditBase.buildTargetGhost = function() {
    return new CQ.Ext.Container({
        xtype:'box',
        autoEl: 'div',
        cls:'cq-editcomponent-ghost',
        listeners: {
            "render": function() {
                // register html5 drag/drop listeners
                var dom = this.getEl().dom;
                if (dom.addEventListener) {
                    var self = this;
                    dom.addEventListener("dragenter", function(evt){
//                        console.log("enter ghost");
                        evt.preventDefault();
                        evt.stopPropagation();
                        if (self.currentTarget) {
                            return self.currentTarget.notifyHTML5DragEnter(evt);
                        }
                    }, false);
                    dom.addEventListener("dragleave", function(evt){
//                        console.log("leaving ghost");
                        evt.preventDefault();
                        evt.stopPropagation();
                        var target = self.currentTarget;
                        if (target) {
                            self.lastTarget = target;
                            self.currentTarget = null;
                            self.isDragOver = false;
                            window.setTimeout(function() {
                                if (!self.isDragOver) {
                                    target.notifyHTML5DragLeave(evt);
                                }
                            }, 1);
                            return false;
                        }
                    }, false);
                    dom.addEventListener("dragover", function(evt){
//                        console.log("over ghost");
                        self.isDragOver = true; // required to avoid flickering
                        evt.preventDefault();
                        evt.stopPropagation();
                        if (self.currentTarget) {
                            return self.currentTarget.notifyHTML5DragOver(evt);
                        }
                    }, false);
                    dom.addEventListener("drop", function(evt){
//                        console.log("drop on ghost");
                        evt.preventDefault();
                        evt.stopPropagation();
                        if (self.currentTarget) {
                            return self.currentTarget.notifyHTML5Drop(evt);
                        }
                        if (self.lastTarget) {
                            return self.lastTarget.notifyHTML5Drop(evt);
                        }
                    }, false);
                }
            }
        }
    });
};

/**
 * Builds a {@link CQ.wcm.EditBase.TargetLine} object
 * @return {CQ.wcm.EditBase.TargetLine} constructed target line
 * @static
 * @private
 */
CQ.wcm.EditBase.buildTargetLine = function() {
    var tl = new CQ.Ext.Container({xtype:'box', autoEl: 'div', cls:'cq-editcomponent-targetline'});

    var tlLeft = new CQ.Ext.BoxComponent({autoEl: 'div', cls:'cq-editcomponent-targetline-left'});
    var tlRight = new CQ.Ext.BoxComponent({autoEl: 'div', cls:'cq-editcomponent-targetline-right'});

    tl.add(tlLeft);
    tl.add(tlRight);

    return tl;
};

/**
 * Target Line: line object to display upper an edit component when dragging over
 * @static
 * @type CQ.Ext.Container
 * @private
 */
CQ.wcm.EditBase.TargetLine = CQ.wcm.EditBase.buildTargetLine();

/**
 * Target Ghost: rectangle object to display upper an edit component when dragging over
 * @static
 * @type CQ.Ext.Container
 * @private
 */
CQ.wcm.EditBase.TargetGhost = CQ.wcm.EditBase.buildTargetGhost();

/**
 * Target mode: line. See {@link #targetMode}.
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.TARGET_MODE_LINE = "line";

/**
 * Target mode: ghost. See {@link #targetMode}.
 * @static
 * @final
 * @type String
 */
CQ.wcm.EditBase.TARGET_MODE_GHOST = "ghost";

/**
 * Currently opened inline dialog.
 * @static
 * @type CQ.Dialog[]
 * @private
 */
CQ.wcm.EditBase.openedInlineDialog = [];

/**
 * Register an inline dialog as "opened".
 * @param {CQ.Dialog} dialog
 * @private
 */
CQ.wcm.EditBase.registerInlineDialog = function(dialog) {
    if (CQ.wcm.EditBase.openedInlineDialog.indexOf(dialog) == -1)
        CQ.wcm.EditBase.openedInlineDialog.push(dialog);
};

/**
 * Unregister an opened inline dialog.
 * @param {CQ.Dialog} dialog
 * @private
 */

CQ.wcm.EditBase.unRegisterInlineDialog = function(dialog) {
    CQ.wcm.EditBase.openedInlineDialog.remove(dialog);
};

/**
 * Returns if a child dialog is opened. A child is a dialog with a path starting with path parameter.
 * @param {String} path The parent dialog path
 * @return {Boolean} True when first child is found, else false
 * @private
 */
CQ.wcm.EditBase.isInlineDialogChildOpened = function(path) {
    var i = 0;
    for (; i < CQ.wcm.EditBase.openedInlineDialog.length; i++) {
        var currentPath = CQ.wcm.EditBase.openedInlineDialog[i].path;
        if (currentPath && currentPath.substring(0, path.length) == path) {
            return true;
        }
    }
    return false;
};