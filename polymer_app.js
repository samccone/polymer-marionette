var tooltipModel = new Backbone.Model({
  tipCopy: "helllo",
  promptCopy: "hover over me."
});

var tooltipRegion = new Marionette.Region({
  el: "#tooltip-region"
});

var editRegion = new Marionette.Region({
  el: "#edit-region"
});

var EditView = Marionette.ItemView.extend({
  template: _.template('<label>set the prompt copy</label></br><input value="<%-promptCopy %>"></input>'),
  ui: {
    'promptCopy': 'input'
  },
  events: function() {
    return {
      "keypress @ui.promptCopy": _.throttle(this.updatePrompt, 200)
    }
  },
  updatePrompt: function() {
    this.model.set("promptCopy", this.ui.promptCopy.val());
  }
});

var TooltipView = Marionette.ItemView.extend({
  tagName: "core-tooltip",
  modelEvents: {
    "change:promptCopy": "render"
  },
  attributes: function(){
    return {
      "label": this.model.get("tipCopy")
    }
  },
  template: _.template('<span><%-promptCopy %></span>')
});

editRegion.show(new EditView({model: tooltipModel}));
tooltipRegion.show(new TooltipView({model: tooltipModel}));
