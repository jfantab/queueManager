# queueManager

Welcome to our Queue Manager!

EXAMPLES OF API CALLS:

Main page:

    curl localhost:8080
    curl localhost:8080/
    curl localhost:8080/index.html
    
Stats page:

    curl localhost:8080/stats.html
    
Questions page:
    
    Getting all questions: curl localhost:8080/questions 
    
    Getting all the questions for Lab 4: curl localhost:8080/questions/4 
    
    Adding a question which happens to be the second on the list: curl -H "Content-Type: application/json" -d '{"question": "Does this work?"}' localhost:8080/questions/2
    
    Upvoting the second question in the list to make it 6 upvotes: curl -H "Content-Type: application/json" -d '{"votes": 5}' localhost:8080/questions/vote/2
    
    Highlighting the second question on the list: curl -H "Content-Type: application/json" -d '{"highlighted": true}' localhost:8080/questions/highlight/2
    
    Deleting a question with id 2: curl -X DELETE localhost:8080/questions/delete/2 
    
    Getting all links: curl localhost:8080/links
    
    Adding a link: curl -H "Content-Type: application/json" -d '{"link": "https://camino.instructure.com"}' localhost:8080/links

File uploads page:

Queue page: 

    Get all members of Demo Queue: curl localhost:8080/demoQ
    
    Post a member to the Demo Queue: curl -H "Content-Type: application/json" -d '{"name": "John Smith"}' localhost:8080/demoQ
    
    Delete a member of the Demo Queue: curl -H "Content-Type: application/json" -d '{"name": "John Smith"}' localhost:8080/demoQD
    
    Get all members of Questions Queue: curl localhost:8080/questionQ
    
    Post a member to the Questions Queue: curl -H "Content-Type: application/json" -d '{"name": "John Smith"}' localhost:8080/questionQ
    
    Delete a member of the Demo Queue: curl -H "Content-Type: application/json" -d '{"name": "John Smith"}' localhost:8080/questionQD
    
    Get all stats for both queues: curl localhost:8080/queueStats
