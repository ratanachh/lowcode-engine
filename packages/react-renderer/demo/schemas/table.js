/* eslint-disable */
export default {
  componentName: 'Page',
  fileName: 'filterTable',
  props: {
    style: {
      paddingRight: 20,
      paddingLeft: 20
    }
  },
  children: [
    {
      componentName: 'Table',
      props: {
        hasBorder: false,
        hasHeader: true,
        dataSource: [
          {
            id: 1,
            title: '2017 Autumn/Winter New Suspender Dress Retro Plaid Dress Vest Skirt A-line Short Skirt',
            url: 'https://item.taobao.com/item.htm?id=558559528377',
            type: 'List',
            publishTime: '17-04-28 20:29:20',
            publishStatus: 'Published',
            pushStatus: 'Pushed to subscription',
            operation: {
              edit: true
            }
          },
          {
            id: 2,
            title: '2017 Autumn/Winter New High-Quality Mohair Wool Sweater',
            url: 'https://item.taobao.com/item.htm?id=558559528377',
            type: 'List',
            publishTime: '17-04-28 20:29:20',
            publishStatus: 'Published',
            pushStatus: 'Pushed to subscription',
            operation: {
              edit: true
            }
          },
          {
            id: 3,
            title: 'Japanese Style Natural Corn Husk Woven Bowl Mat Pot Mat Insulation Mat Thick Placemat GD-29',
            url: 'https://item.taobao.com/item.htm?id=558559528377',
            type: 'List',
            publishTime: '17-04-28 20:29:20',
            publishStatus: 'Published',
            pushStatus: 'Pushed to subscription',
            operation: {
              edit: true
            }
          },
          {
            id: 4,
            title: '2017 Autumn/Winter New Belted Waist Design Smooth Cupro Silk Dress',
            url: 'https://item.taobao.com/item.htm?id=558559528377',
            type: 'List',
            publishTime: '17-04-28 20:29:20',
            publishStatus: 'Published',
            pushStatus: 'Pushed to subscription',
            operation: {
              edit: true
            }
          },
          {
            id: 5,
            title: 'Japanese Style Candy Color Ceramic Handle Stainless Steel Tableware Steak Knife Fork Spoon',
            url: 'https://item.taobao.com/item.htm?id=558559528377',
            type: 'List',
            publishTime: '17-04-28 20:29:20',
            publishStatus: 'Published',
            pushStatus: 'Pushed to subscription',
            operation: {
              edit: true
            }
          },
          {
            id: 6,
            title: 'Japanese Style Deep Blue Plain Art Napkin Placemat Apron Pot Mat Insulated Glove Kitchen Tablecloth',
            url: 'https://item.taobao.com/item.htm?id=558559528377',
            type: 'List',
            publishTime: '17-04-28 20:29:20',
            publishStatus: 'Published',
            pushStatus: 'Pushed to subscription',
            operation: {
              edit: true
            }
          },
          {
            id: 7,
            title: 'Japanese Style Snow Point Cherry Blossom Hand-Painted Ceramic Tableware Rice Bowl Ramen Bowl Sushi Plate Soup Bowl',
            url: 'https://item.taobao.com/item.htm?id=558559528377',
            type: 'List',
            publishTime: '17-04-28 20:29:20',
            publishStatus: 'Published',
            pushStatus: 'Pushed to subscription',
            operation: {
              edit: true
            }
          },
          {
            id: 8,
            title: 'Kawashimaya Underglaze Retro Japanese Ceramic Plate Dish Round Plate Seasoning Saucer Rice Bowl Japanese Tableware',
            url: 'https://item.taobao.com/item.htm?id=558559528377',
            type: 'List',
            publishTime: '17-04-28 20:29:20',
            publishStatus: 'Published',
            pushStatus: 'Pushed to subscription',
            operation: {
              edit: true
            }
          }
        ]
      },
      children: [
        {
          componentName: 'TableColumn',
          props: {
            dataIndex: 'title',
            title: 'Description',
            resizable: false
          }
        },
        {
          componentName: 'TableColumn',
          props: {
            title: 'Category',
            dataIndex: 'type'
          }
        },
        {
          componentName: 'TableColumn',
          props: {
            title: 'Publish Time',
            dataIndex: 'publishTime'
          }
        },
        {
          componentName: 'TableColumn',
          props: {
            title: 'Status',
            dataIndex: 'publishStatus',
            cell: [
              {
                componentName: 'Button',
                props: {
                  type: 'normal',
                  size: 'small',
                  component: 'div',
                  text: true,
                  ghost: false,
                  style: {
                    width: '30px',
                    fontSize: '12px',
                    color: '#666',
                    cursor: 'auto',
                    background: '#f7f8fa'
                  }
                },
                children: 'Published',
                condition: false
              },
              {
                componentName: 'Text',
                props: {
                  text: 'Published',
                  style: {
                    paddingTop: 2,
                    paddingRight: 5,
                    paddingBottom: 2,
                    paddingLeft: 5,
                    fontSize: '12px',
                    color: '#666',
                    borderRadius: 3,
                    cursor: 'auto',
                    background: '#f7f8fa'
                  }
                }
              }
            ]
          }
        },
        {
          componentName: 'TableColumn',
          props: {
            title: 'Action',
            cell: [
              {
                componentName: 'Button',
                props: {
                  type: 'normal',
                  component: 'a',
                  size: 'medium',
                  loading: false,
                  text: true,
                  style: {
                    paddingRight: 10,
                    paddingLeft: 10,
                    color: '#2077ff'
                  }
                },
                children: 'Resolve'
              },
              {
                componentName: 'Button',
                props: {
                  type: 'normal',
                  component: 'a',
                  text: true,
                  style: {
                    paddingRight: 10,
                    paddingLeft: 10,
                    color: '#2077ff'
                  }
                },
                children: 'Details'
              },
              {
                componentName: 'Button',
                props: {
                  type: 'normal',
                  text: true,
                  component: 'a',
                  style: {
                    paddingRight: 10,
                    paddingLeft: 10,
                    color: '#2077ff'
                  }
                },
                children: 'Category'
              }
            ]
          }
        }
      ],
      loopArgs: ['', '']
    },
    {
      componentName: 'Div',
      props: {
        style: {
          textAlign: 'right'
        }
      },
      children: [
        {
          componentName: 'Pagination',
          props: {
            shape: 'normal',
            type: 'normal',
            size: 'medium',
            style: {
              marginTop: 20
            }
          }
        }
      ]
    }
  ],
  dataSource: {
    dataHandler: function dataHandler(dataMap) {
      let dataSource = [
        {
          id: 1,
          title: '2017 Autumn/Winter New Suspender Dress Retro Plaid Dress Vest Skirt A-line Short Skirt',
          url: 'https://item.taobao.com/item.htm?id=558559528377',
          type: 'List',
          publishTime: '17-04-28 20:29:20',
          publishStatus: 'Published',
          pushStatus: 'Pushed to subscription',
          operation: {
            edit: true
          }
        },
        {
          id: 2,
          title: '2017 Autumn/Winter New High-Quality Mohair Wool Sweater',
          url: 'https://item.taobao.com/item.htm?id=558559528377',
          type: 'List',
          publishTime: '17-04-28 20:29:20',
          publishStatus: 'Published',
          pushStatus: 'Pushed to subscription',
          operation: {
            edit: true
          }
        },
        {
          id: 3,
          title: 'Japanese Style Natural Corn Husk Woven Bowl Mat Pot Mat Insulation Mat Thick Placemat GD-29',
          url: 'https://item.taobao.com/item.htm?id=558559528377',
          type: 'List',
          publishTime: '17-04-28 20:29:20',
          publishStatus: 'Published',
          pushStatus: 'Pushed to subscription',
          operation: {
            edit: true
          }
        },
        {
          id: 4,
          title: '2017 Autumn/Winter New Belted Waist Design Smooth Cupro Silk Dress',
          url: 'https://item.taobao.com/item.htm?id=558559528377',
          type: 'List',
          publishTime: '17-04-28 20:29:20',
          publishStatus: 'Published',
          pushStatus: 'Pushed to subscription',
          operation: {
            edit: true
          }
        },
        {
          id: 5,
          title: 'Japanese Style Candy Color Ceramic Handle Stainless Steel Tableware Steak Knife Fork Spoon',
          url: 'https://item.taobao.com/item.htm?id=558559528377',
          type: 'List',
          publishTime: '17-04-28 20:29:20',
          publishStatus: 'Published',
          pushStatus: 'Pushed to subscription',
          operation: {
            edit: true
          }
        },
        {
          id: 6,
          title: 'Japanese Style Deep Blue Plain Art Napkin Placemat Apron Pot Mat Insulated Glove Kitchen Tablecloth',
          url: 'https://item.taobao.com/item.htm?id=558559528377',
          type: 'List',
          publishTime: '17-04-28 20:29:20',
          publishStatus: 'Published',
          pushStatus: 'Pushed to subscription',
          operation: {
            edit: true
          }
        },
        {
          id: 7,
          title: 'Japanese Style Snow Point Cherry Blossom Hand-Painted Ceramic Tableware Rice Bowl Ramen Bowl Sushi Plate Soup Bowl',
          url: 'https://item.taobao.com/item.htm?id=558559528377',
          type: 'List',
          publishTime: '17-04-28 20:29:20',
          publishStatus: 'Published',
          pushStatus: 'Pushed to subscription',
          operation: {
            edit: true
          }
        },
        {
          id: 8,
          title: 'Kawashimaya Underglaze Retro Japanese Ceramic Plate Dish Round Plate Seasoning Saucer Rice Bowl Japanese Tableware',
          url: 'https://item.taobao.com/item.htm?id=558559528377',
          type: 'List',
          publishTime: '17-04-28 20:29:20',
          publishStatus: 'Published',
          pushStatus: 'Pushed to subscription',
          operation: {
            edit: true
          }
        }
      ];
      return {
        ...dataMap,
        dataSource
      };
    }
  }
};
