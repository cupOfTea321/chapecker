# API documentation

### HTTP-METHOD /api/v2/*
`This is proxy, all requests are redirected to Practicum API`


### POST /api/forum/topic
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
401: ''
```


### GET /api/forum/topics
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


### POST /api/forum/comment 
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


### GET /api/forum/comments/:topic_id
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

### POST /api/forum/reply
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

### GET /api/forum/replies/:comment_id 
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
