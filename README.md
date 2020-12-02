# queueManager

Welcome to our Queue Manager!

EXAMPLES OF API CALLS:

Main page:

    curl localhost:8080
    curl localhost:8080/
    curl localhost:8080/index.html

Questions page:
    
    Getting all questions: curl localhost:8080/questions 
    
    Getting all the questions for Lab 4: curl localhost:8080/questions/4 
    
    Adding a question which happens to be the second on the list: curl -H "Content-Type: application/json" -d '{"question": "Does this work?"}' localhost:8080/questions/2
    
    Upvoting the second question in the list to make it 6 upvotes: curl -H "Content-Type: application/json" -d '{"votes": 5}' localhost:8080/questions/vote/2
    
    Highlighting the second question on the list: curl -H "Content-Type: application/json" -d '{"highlighted": true}' localhost:8080/questions/highlight/2
    
    Getting all links: curl localhost:8080/links
    
    Adding a link: curl -H "Content-Type: application/json" -d '{"link": "https://camino.instructure.com"}' localhost:8080/links

File uploads page:

Demo page: 
