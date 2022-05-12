export default function handler(req, res) {
  res.status(200).json(
    [
      {
        "key": "564564",
        "data": {
          "name": "Pictures",
          "size": "150kb",
          "type": "Folder"
        },
        "children": [
          {
            "key": "564564",
            "data": {
              "name": "barcelona.jpg",
              "size": "90kb",
              "type": "Picture"
            }
          },
          {
            "key": "87989",
            "data": {
              "name": "primeng.png",
              "size": "30kb",
              "type": "Picture"
            }
          },
          {
            "key": "7-2",
            "data": {
              "name": "prime.jpg",
              "size": "30kb",
              "type": "Picture"
            }
          }
        ]
      },
      {
        "key": "8",
        "data": {
          "name": "Videos",
          "size": "1500kb",
          "type": "Folder"
        },
        "children": [
          {
            "key": "8-0",
            "data": {
              "name": "primefaces.mkv",
              "size": "1000kb",
              "type": "Video"
            }
          },
          {
            "key": "8-1",
            "data": {
              "name": "intro.avi",
              "size": "500kb",
              "type": "Video"
            }
          }
        ]
      }
    ]
  )
}
