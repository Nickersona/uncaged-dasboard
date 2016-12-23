(function() {
    // Timing Constants
    const CYCLE_TIMEOUT = 10000;
    const FETCH_DATA_INTERVAL = 1000 * 60 * 60;

    // Classes
    const HIGHLIGHT_CLASS = 'js-highlight';

    // Replacements Array. Each slide randomly picks a title from this list.
    const chimperReplacements = [
        'A beautiful soul',
        'A generous heart',
        'A thoughtful giver',
        'A savvy tax planner',
        'An authentic changemaker',
        'An empowered human spirit'
    ];

    const processMessage = (text) => {
      //Wraps the money in a money in a span to highlight
      text = text.replace(/\$(.*?)(\s)/, `<span style="${HIGHLIGHT_CLASS}">$1 </span>`);

      //Replace Chimper with a randomly selected name from the chimper array
      var replacement = chimperReplacements[Math.floor(Math.random() * chimperReplacements.length)];
      text = text.replace(/A Chimper/, replacement);
      return text;
    }


    const recieveNewData = (containerEl, data) => {
        const activity = data;
        let textElement = containerEl.querySelector('.js-current-item')
        let idx, rotate;

        if ((activity == null) || activity.length <= 0) {
            console.log('No activity Found');
            return;
        }

        idx = 0;
        rotate = () => {
            var next;

            // cycles around and start all over again
            if (idx === activity.length) {
                idx = 0;
            }

            next = activity[idx];
            return $(containerEl).fadeOut(1000, function() {
                textElement.innerHTML = processMessage(next.text);
                return $(containerEl).fadeIn(600, function() {
                    idx++;
                    return setTimeout(rotate, CYCLE_TIMEOUT);
                });
            });
        };
        return rotate();
    }

    const removeAdds = (fundAllocation) => {
        return fundAllocation.icon === "dashboard-send";
    }

    const fetchSiteActivity = (el, endpoint) => {
        $.get(endpoint, null, function(activityData){
            var rotatorData = _.filter(activityData, removeAdds);
            recieveNewData(el, rotatorData);
        }, "json");
    }

    const initActivityRotator = (element, endpoint) => {
        fetchSiteActivity(element, endpoint); // Initial fetch
        setInterval(fetchSiteActivity.bind(null, element, endpoint), FETCH_DATA_INTERVAL)
    };



    initActivityRotator(document.querySelector('.js-site-activity'), '/site-activity');
})();
