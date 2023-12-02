# Forum API documentation

### POST /api/auth/signin
`Authorize`

*This is a proxy that redirects requests to Practicum API*

**Body**:
```
{
  login: string,
  password: string
}
```

**Response**:
```
200: 'OK'
400: *string*
```


### POST /api/topic
`Create a topic`

**Body**: 
```
{ 
  title: string
}
```

**Response**:
```
201: 'OK'
400: string
```


### GET /api/topics
`Get json with all topics`

**Response**:
```
200:
[
  {
    id: integer,
    title: string,
    creator_id: integer
  }
  ...
]

400: string
```


### POST /api/comment 
`Send a comment`

**Body**:
```
{
  text: string,
  topic_id: integer
}
```

**Response**:
```
201: 'OK'
400: string
```


### GET /api/comments/:topic_id
`Get json with all comments to the topic with topic_id`

**Response**:
```
200:
[
  {
    id: integer,
    text: string
  }
  ...
]
400: string
```

### POST /api/reply
`Send a reply`

**Body**:
```
{
  text: string,
  comment_id: integer
}
```

**Response**:
```
201: 'OK'
400: string
```

### GET /api/replies/:comment_id 
`Get all replies to the comment with comment_id`

*Response*:
```
200:
[
  {
    id: integer,
    text: string
  }
  ...
]

400: string
```
