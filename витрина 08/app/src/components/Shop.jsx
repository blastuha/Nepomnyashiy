import React, { useState, useEffect } from 'react'
import { API_URL, API_KEY } from '../config'
import { Preloader } from './Preloader'
import { GoodsList } from './GoodsList'
import { Cart } from './Cart'

function Shop() {
  const [goods, setGoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState([])

  useEffect(function getGoods() {
    // fetch имеет 2 параметра: 1) для ссылки, 2) массив опций (в данном случае для заголовка)
    fetch(API_URL, {
      headers: { Authorization: API_KEY },
    })
      .then((res) => res.json())
      .then((data) => {
        setGoods(data.featured)
        setLoading(false)
      })
      .catch((err) => console.warn(err))
    // .finally(() => console.log(goods))
  }, [])

  const addGoodToOrder = (id) => {
    console.log(order)
    setOrder(
      goods
        .filter((item) => id === item.id)
        .map((item) => {
          return item
        })
    )
  }

  return (
    <div>
      <main className='container content'>
        <Cart quantity={order.length} />
        {loading ? (
          <Preloader />
        ) : (
          <GoodsList
            goods={goods}
            addGoodToOrder={addGoodToOrder}
          />
        )}
      </main>
    </div>
  )
}

export { Shop }
