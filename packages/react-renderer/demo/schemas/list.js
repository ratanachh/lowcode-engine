/* eslint-disable */
export default {
  componentName: 'Page',
  fileName: 'tab_article',
  props: {
    style: {
      paddingTop: 20,
      paddingRight: 20,
      paddingLeft: 20
    }
  },
  children: [
    {
      componentName: 'Div',
      props: {
        style: {
          marginTop: 5,
          marginBottom: 15,
          borderBottom: '1px solid rgba(244,244,244)'
        }
      },
      children: [
        {
          componentName: 'Div',
          props: {
            style: {
              marginBottom: 15
            }
          },
          children: [
            {
              componentName: 'Text',
              props: {
                text: '{{this.item.title}}',
                style: {
                  color: 'rgba(51,51,51)'
                }
              }
            },
            {
              componentName: 'Text',
              props: {
                text: '{{this.item.datetime}}',
                style: {
                  fontSize: '12px',
                  color: '#666',
                  float: 'right'
                }
              }
            }
          ]
        },
        {
          componentName: 'Div',
          props: {
            style: {
              paddingBottom: 15,
              fontSize: '13px',
              color: '#666'
            }
          },
          children: '{{this.item.description}}'
        },
        {
          componentName: 'Div',
          props: {
            style: {
              marginBottom: 15
            }
          },
          children: [
            {
              componentName: 'Button',
              props: {
                type: 'normal',
                style: {
                  marginRight: 5,
                  marginLeft: 5
                },
                size: 'small'
              },
              children: '{{this.item}}',
              loop: '{{this.item.tags}}'
            },
            {
              componentName: 'Div',
              props: {
                style: {
                  marginBottom: 15,
                  float: 'right'
                }
              },
              children: [
                {
                  componentName: 'Div',
                  props: {
                    style: {
                      display: 'inline-block',
                      marginRight: 5,
                      marginBottom: 15,
                      marginLeft: 5,
                      fontSize: 12,
                      color: '#666',
                      float: 'none'
                    }
                  },
                  children: '{{"Likes: "+this.item.star}}'
                },
                {
                  componentName: 'Div',
                  props: {
                    style: {
                      display: 'inline-block',
                      marginRight: 5,
                      marginBottom: 15,
                      marginLeft: 5,
                      fontSize: 12,
                      color: '#666',
                      float: 'none'
                    }
                  },
                  children: '{{"Favorites: "+this.item.like}}'
                },
                {
                  componentName: 'Div',
                  props: {
                    style: {
                      display: 'inline-block',
                      marginRight: 5,
                      marginBottom: 15,
                      marginLeft: 5,
                      fontSize: 12,
                      color: '#66',
                      float: 'none'
                    }
                  },
                  children: '{{"Comments: "+this.item.comment}}'
                }
              ]
            }
          ]
        }
      ],
      loop: '{{this.state.dataSource}}'
    },
    {
      componentName: 'Pagination',
      props: {
        shape: 'normal',
        type: 'normal',
        size: 'medium',
        style: {
          marginTop: 10,
          marginBottom: 30,
          textAlign: 'right'
        },
        onChange: function onChange(current, e) {
          // Callback function triggered when the page number changes
          // @param {Number} current the new page number
          // @param {Object} e the click event object
          this.page.reloadDataSource();
        }
      }
    }
  ],
  dataSource: {
    dataHandler: function dataHandler(dataMap) {
      const dataSource = [
        {
          title: 'Summer Vibes - July Official Marketing Campaign - Skill Improvement Track',
          description:
            'Merchants select streamers via V-Task and reach an agreement; fees are calculated per product link, with one price per product. Streamers are advised to feature at most 60 products per livestream, provide at least two hours of streaming, and spend at least 5 minutes introducing each product.',
          tags: ['Livestream', 'Promotion', 'Overview'],
          datetime: 'Dec 12, 2017 18:00',
          star: Math.floor(Math.random() * 100) + 100,
          like: Math.floor(Math.random() * 100) + 200,
          comment: Math.floor(Math.random() * 100) + 100
        },
        {
          title: 'Summer Vibes - July Official Marketing Campaign - Skill Improvement Track',
          description:
            'Merchants select streamers via V-Task and reach an agreement; fees are calculated per product link, with one price per product. Streamers are advised to feature at most 60 products per livestream, provide at least two hours of streaming, and spend at least 5 minutes introducing each product.',
          tags: ['Livestream', 'Promotion', 'Overview'],
          datetime: 'Dec 12, 2017 18:00',
          star: Math.floor(Math.random() * 100) + 100,
          like: Math.floor(Math.random() * 100) + 200,
          comment: Math.floor(Math.random() * 100) + 100
        },
        {
          title: 'Summer Vibes - July Official Marketing Campaign - Skill Improvement Track',
          description:
            'Merchants select streamers via V-Task and reach an agreement; fees are calculated per product link, with one price per product. Streamers are advised to feature at most 60 products per livestream, provide at least two hours of streaming, and spend at least 5 minutes introducing each product.',
          tags: ['Livestream', 'Promotion', 'Overview'],
          datetime: 'Dec 12, 2017 18:00',
          star: Math.floor(Math.random() * 100) + 100,
          like: Math.floor(Math.random() * 100) + 200,
          comment: Math.floor(Math.random() * 100) + 100
        },
        {
          title: 'Summer Vibes - July Official Marketing Campaign - Skill Improvement Track',
          description:
            'Merchants select streamers via V-Task and reach an agreement; fees are calculated per product link, with one price per product. Streamers are advised to feature at most 60 products per livestream, provide at least two hours of streaming, and spend at least 5 minutes introducing each product.',
          tags: ['Livestream', 'Promotion', 'Overview'],
          datetime: 'Dec 12, 2017 18:00',
          star: Math.floor(Math.random() * 100) + 100,
          like: Math.floor(Math.random() * 100) + 200,
          comment: Math.floor(Math.random() * 100) + 100
        },
        {
          title: 'Summer Vibes - July Official Marketing Campaign - Skill Improvement Track',
          description:
            'Merchants select streamers via V-Task and reach an agreement; fees are calculated per product link, with one price per product. Streamers are advised to feature at most 60 products per livestream, provide at least two hours of streaming, and spend at least 5 minutes introducing each product.',
          tags: ['Livestream', 'Promotion', 'Overview'],
          datetime: 'Dec 12, 2017 18:00',
          star: Math.floor(Math.random() * 100) + 100,
          like: Math.floor(Math.random() * 100) + 200,
          comment: Math.floor(Math.random() * 100) + 100
        }
      ];
      return {
        dataSource
      };
    }
  }
};
