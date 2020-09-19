// VARIABLES
const tweetList = document.getElementById('tweet-list');


// EVENTLISTENERS

 eventListeners();

function eventListeners(){
	// FORM SUBMISSION
	document.querySelector('#form').addEventListener('submit', newTweet);

	//REMOVE TWEET FROM LIST
	tweetList.addEventListener('click', removeTweet);

	// DOCUMENT
	document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}


// FUNCTIONS

function newTweet(e){
	e.preventDefault();
	// console.log('Form submitted by Alhumdi');

	// READ THE TEXTAREA VALUE
	const tweet = document.querySelector('#tweet').value;

	// console.log(tweet);

	// CREATE A <li> ELEMENT
	const li = document.createElement('li');
	li.textContent = tweet;

	// ADD TO THE LIST
	tweetList.appendChild(li);

	// CREATE A REMOVE BUTTON
	const removeBtn = document.createElement('a');
	removeBtn.textContent = 'X';
	removeBtn.classList = 'remove-tweet'								
	
	// ADD THE REMOVE BUTTON TO EACH TWEET
	li.appendChild(removeBtn);

	// ADD TWEET INTO LOCAL STORAGE
	addTweetLocalStorage(tweet);										

	// PRINT THE ALERT
	alert('Tweet Added');

	this.reset();
}

function removeTweet(e){
	// REMOVES THE TWEETS FORM THE DOM
	// console.log('List selected');
	if(e.target.classList.contains('remove-tweet')){
		// console.log(true);
		e.target.parentElement.remove();
	}

	// REMOVE FROM STORAGE
	// console.log(e.target.parentElement.textContent);
	removeTweetLocalStorage(e.target.parentElement.textContent);
}

// ADDS THE TWEETS INTO LOCAL STORAGE
function addTweetLocalStorage(tweet){
	let tweets = getTweetsFromStorage();
	// console.log(tweets);

	// ADD THE TWEET INTO ARRAY
	tweets.push(tweet);
	// console.log(tweets);

	// CONVERT TWEET ARRAY INTO STRING
	 localStorage.setItem('tweets', JSON.stringify(tweets));

}

function getTweetsFromStorage(){
	let tweets;
	const tweetsLS = localStorage.getItem('tweets');

	// GET THE VALUES, IF NULL IS RETURNED THEN WE CREATE AN EMPTY ARRAY
	if (tweetsLS === null) {
		tweets = [];
	} else{
		tweets = JSON.parse(tweetsLS);
	}
	return tweets;
}

// PRINTS LOCAL STORAGE TWEETS ON LOAD
function localStorageOnLoad() {
	let tweets = getTweetsFromStorage();
	// LOOP THROUGH STORAGE AND THEN PRINT THE VALUES
	tweets.forEach(function(tweet){
		// CREATE THE REMOVE BUTTON
		const removeBtn = document.createElement('a');
		removeBtn.textContent = 'X';
		removeBtn.classList = 'remove-tweet';

		// CREATE A <li> ELEMENT
		const li = document.createElement('li');
		li.textContent = tweet;

		// ADD THE REMOVE BUTTON TO EACH TWEET
		li.appendChild(removeBtn);

		// ADD TO THE LIST
		tweetList.appendChild(li);
	});
}

// REMOVE THE TWEET FROM LOCAL STORAGE
function removeTweetLocalStorage(tweet){
	// GET TWEETS FROM STORAGE
	let tweets = getTweetsFromStorage();

	// REMOVE THE X FROM THE TWEET
	const tweetDelete = tweet.substring(0, tweet.length-1);
	// console.log(tweetDelete);

	// LOOP THROUGH TWEETS AND REMOVE THE TWEET THAT'S EQUAL
	tweets.forEach(function(tweetLS, index){
		if(tweetDelete === tweetLS)
			tweets.splice(index, 1);
	});

	// SAVE THE DATA
	localStorage.setItem('tweets', JSON.stringify(tweets));
}