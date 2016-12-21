const TIMEOUT = 4500;

var SiteActivity = function(element, endpoint){
    this.el = element;
    this.endpoint = endpoint;
    this.activity = [];
    this.highlightClass = 'js-highlight';
    this.chimperReplacements = ['A beautiful soul', 'A generous heart', 'A thoughtful giver', 'A savvy tax planner', 'An authentic changemaker', 'An empowered human spirit'];

    this.callSiteActivityEndPoint();
    setInterval(callSiteActivityEndPoint, 1000 * 60 * 60)
};


SiteActivity.prototype.processText = function(text){

  //Wraps the money in a money in a span to highlight
  text = text.replace(/\$(.*?)(\s)/, '<span style="'+ this.highlightClass +'">$1 </span>');

  //Replace Chimper with a randomly selected name from the chimper array
  var replacement = this.chimperReplacements[Math.floor(Math.random()*this.chimperReplacements.length)]
  text = text.replace(/A Chimper/, replacement)
  return text;
}

SiteActivity.prototype.initActivityRotator = function(data){
    var textElement = this.el.querySelector('.js-current-item')
    var idx, rotate;
    var activity = data;

    if ((activity == null) || activity.length <= 0) {
        console.log('No activity Found');
        return;
    }

    idx = 0;
    var self = this;
    rotate = function() {
        var next;

        if (idx === activity.length) {
            idx = 0;
        }

        next = activity[idx];
        return $(self.el).fadeOut(1000, function() {
            textElement.innerHTML = self.processText(next.text);
            return $(self.el).fadeIn(600, function() {
                idx = idx + 1;
                return setTimeout(rotate, TIMEOUT);
            });
        });
    };
    return rotate();
}

SiteActivity.prototype.callSiteActivityEndPoint  = function() {
    $.get(this.endpoint, null, function(activityData){
        this.activity = activityData;
        var rotatorData = _.filter(this.activity, removeAdds);

        this.initActivityRotator(rotatorData);
    }.bind(this), "json");
}

function removeAdds(fundAllocation){
  return fundAllocation.icon === "dashboard-send";
}

new SiteActivity(document.querySelector('.js-site-activity'), '/site-activity');
