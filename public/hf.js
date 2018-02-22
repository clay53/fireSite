var attribute = function (config) {
	this.attribute = config.attribute || "";
	this.val = config.val || "";
};

//tag class
var tag = function (config) {
	this.tag = config.tag || "";
	this.attributes = config.attributes || [];
	this.val = config.val || "";
	this.children = config.children || [];
	this.build = function (parent = document.body) {
		var  t = document.createElement(this.tag);
		for (var j = 0; j < this.attributes.length; j++) {
			var a = document.createAttribute(this.attributes[j].attribute);
			a.value = this.attributes[j].val;
			t.setAttributeNode(a);
		}
		var v = document.createTextNode(this.val);
		t.appendChild(v);
		for (var k = 0; k < this.children.length; k++) {
			this.children[k].build(t);
		}
		parent.appendChild(t);
	};
};

//page class
var page = function (config) {
	this.name = config.name;
	this.url = config.url;
};

//put pages here
var pages = [
	new page ({
		name: "Home",
		url: "/"
	}),
	new page ({
		name: "Games",
		url: "/games"
	}),
	new page ({
		name: "Software",
		url: "/software"
	}),
	new page ({
		name: "Shop",
		url: "/shop"
	})
];

var footer = [
	new tag ({
		tag: "h2",
		children: [
			new tag ({
				tag: "a",
				attributes: [
					new attribute ({
						attribute: "href",
						val: "https://www.youtube.com/channel/UChXdVQ8mm8UQBir87KaRgTQ?&ab_channel=ClaytonDoesThings"
					})
				],
				val: "Subscribe to my Youtube Channel"
			})
		]
	}),
	new tag ({
		tag: "p",
		children: [
			new tag ({
				tag: "a",
				val: "Site not loading correctly? Try pressing ctrl + F5"
			})
		]
	})
];


//header stuff
function h () {
	var nav = document.getElementById("nav"); //get nav element
	for (var i = 0; i < pages.length; i++) {
		var li = document.createElement("li"); //create list element
		var a = document.createElement("a"); //create "a" element
		var h = document.createAttribute("href"); //create href attribute
		h.value = pages[i].url; //set href to page url
		var t = document.createTextNode(pages[i].name); //a text to page name
		nav.appendChild(li); //add list element to nav
		li.appendChild(a); //add "a" element to list element
		a.appendChild(t); //add text node to "a" element
		a.setAttributeNode(h); //add href attribute to "a" element
	}
}

//footer stuff
function f () {
	for (var i = 0; i < footer.length; i++) {
		footer[i].build();
	}
}

function hf () {
	h(); //header
	f(); //footer
}