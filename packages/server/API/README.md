# API documentation

### HTTP-METHOD /api/v2/*
`This is proxy, all requests are redirected to Practicum API`

**IMPORTANT!** In order to be authorized to this server, the user must authorize via
`/api/v2/auth/signin` and then send GET-query to `/api/v2/auth/user`


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


### GET /api/forum/topics?limit=x&offset=y
`Get json with all topics`

*Pagination: limit and offset should come as query parameters, their default values are 10 and 0 respectively*

**Response**:
```
200:
[
  {
    topic_id: integer,
    title: string,
    creator_id: integer,
    createdAt: string //ISO timestamp
  }
  ...
]

400: string
```

### GET /api/forum/count/topics
`Get json with count of topics`

**Response**:
```
200:
{
  count: number
}

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
401: ''
```


### GET /api/forum/comments/:topic_id?limit=x&offset=y
`Get json with all comments to the topic with topic_id`

*Pagination: limit and offset should come as query parameters, their default values are 10 and 0 respectively*

**Response**:
```
200:
[
  {
    comment_id: integer,
    text: string
    creator_id: integer,
    createdAt: string //ISO timestamp
  }
  ...
]
400: string
```

### GET /api/forum/count/comments/:topic_id
`Get json with count of comments in topic with topic_id`

**Response**:
```
200:
{
  count: number
}

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
401: ''
```

### GET /api/forum/replies/:comment_id?limit=x&offset=y
`Get all replies to the comment with comment_id`

*Pagination: limit and offset should come as query parameters, their default values are 10 and 0 respectively*

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

### GET /api/forum/count/replies/:comment_id
`Get json with count of replies in comment with comment_id`

**Response**:
```
200:
{
  count: number
}

400: string
```


### POST /api/forum/emoji
`Send an emoji to topic_id`

**Body**:
```
{
  emoji: string,
  topic_id: integer
}
```

**Response**:
```
201: 'OK'
400: string
401: ''
```

### GET /api/forum/emoji/:topic_id
`Get all emoji to the topic with topic_id`

*Response*:
```
200:
[
  {
    creator_id: integer,
    topic_id: integer,
    emoji: string
  }
  ...
]

400: string
```

### GET /api/forum/count/emoji/:topic_id
`Get json with count of emoji in topic with topic_id`

**Response**:
```
200:
{
  count: number
}

400: string
```
