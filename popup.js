let trigger = document.getElementById('trigger');

trigger.onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action_message: "trigger"}, function(response){
			if (response.enable)
			{
				trigger.innerHTML = "Disable";
			}
			else
			{
				trigger.innerHTML = "Enable";
			}
		});
	});
}