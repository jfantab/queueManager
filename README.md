# queueManager

Welcome to our Queue Manager! /index.html is the path to our landing page, from where you can navigate to our other pages using the navigation bar or the stats page.

We used Firebase for the questions page; everything else (other pages and stats) has data stored in files.

The questions page allows students to submit questions ranked by highlighted as lowest and then descending by upvotes. Highlights for questions stay persistent even after refreshing or closing the browser. Questions can also be filtered by labs. Links can also be submitted below the questions box.

The file upload page allows a user to select a file to upload to the site as well as download files. The information displayed includes the file name, file type, file size, and the link to download. This is our extra credit feature in this project! 

The queue page allows students to add themselves to a queue for demoing or to ask questions. To add a name to either queue, the user must first input one of the approved student PINs or TA PINs. Student access only allows for a user to add names to the queue. TA access allows for the addition and removal of users from the queues. To keep track of which access is activated, the PIN input box will read either "Enter PIN" (no access; white background), "TA Access" (green background), or "Student Access" (blue background).

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
    
    Getting all files already on the server: curl localhost:8080/getAllFiles
    
    Upload a file to the server: curl -F 'data=@<path to local file' localhost:8080/html/fileUploads.html
    
    ダウンロード　ファイル: curl localhost:8080/downloadFile/:filename --output filename
    (Download File)
    
    ウエブページ　の　統計: curl localhost:8080/fileUploadStats
    (Page Statistics) (＾ω＾)

Queue page: 

    Get all members of Demo Queue: curl localhost:8080/demoQ
    
    Post a member to the Demo Queue: curl -H "Content-Type: application/json" -d '{"name": "John Smith"}' localhost:8080/demoQ
    
    Delete a member of the Demo Queue: curl -H "Content-Type: application/json" -d '{"name": "John Smith"}' localhost:8080/demoQD
    
    Get all members of Questions Queue: curl localhost:8080/questionQ
    
    Post a member to the Questions Queue: curl -H "Content-Type: application/json" -d '{"name": "John Smith"}' localhost:8080/questionQ
    
    Delete a member of the Questions Queue: curl -H "Content-Type: application/json" -d '{"name": "John Smith"}' localhost:8080/questionQD
    
    Get all stats for both queues: curl localhost:8080/queueStats
