
## Tools & Technology

![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![VS](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![scss](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white )
![html](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![js](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![windows](https://img.shields.io/badge/Windows_XP-003399?style=for-the-badge&logo=windows-xp&logoColor=white)
![GH](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![chrome](https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white)
![]()




|Partition       | Technology                    
|----------------|-------------------------------|
|Ui/Ux Design    |`'I Used Figma to design components'`         
|Front End       |`"React with some React libraries Like Chakra Ui"`    
|Back End        |`Firebase API`




## [SELLZIA](https://sellezya.web.app/) Diagrams

In this part you will see a simple diagram of the components of the project 

```mermaid
sequenceDiagram
Firebase Auth  ->> Check User Exist: Go to Route Process
Check User Exist  ->> React Protected Route : Route to Home
React Protected Route -->>Home: Swipe to ./ 
Home--x Movie Api: Fetch Data With Axios
Movie Api-x Home: Get Response From Api
Movie Api-x MovieComponent: Get one Movie From Api with token and id
Home--> MovieRoute: On Click Get One Movie With ID
MovieRoute->MovieComponent: Show The Movie
```

### [SELLEZIA](https://sellezya.web.app/) Flow Chart:

```mermaid
graph LR
A((React)) -- Api --> B((Firebase))
A((React)) -- Lib --> S((Chakra Ui))
B --> e((firebase Event Listener))
B --> s((firebase Store))
B --> k((firebase Auth))
D{{mian project}}
A -- Api --> w{{Axios}}
A --Lib--> l{{React-route}}
A --Api--> o{{React-paginate}}
A --Lib--> p{{React-toastify}}
A --Hook--> f{{Context-api}}
A --Api--> q{{Web-vitals}}
q --> D
l --> D
f --> D
o --> D
p --> D
w --> D
e --> D
k --> D
s --> D
S --> D


```
