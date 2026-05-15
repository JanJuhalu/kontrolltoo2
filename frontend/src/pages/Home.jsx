import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { ArrowDown, ArrowUp, Check, ShoppingBag } from "lucide-react"
import { Link } from 'react-router-dom'

function Home() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sort, setSort] = useState("id,asc")
  const [size, setSize] = useState(2)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const CATEGORIES_API_URL = "http://localhost:8080/categories"
  const PRODUCTS_API_URL = "http://localhost:8080/products"

  useEffect(() => {
    fetch(CATEGORIES_API_URL)
      .then((response) => response.json())
      .then((json) => setCategories(json))
  }, [])

  useEffect(() => {
    let url = PRODUCTS_API_URL + "?page=" + page + "&size=" + size + "&sort=" + sort

    if (selectedCategory !== "all") {
      url = url + "&category=" + selectedCategory
    }

    fetch(url)
      .then(res => res.json())
      .then(json => {
        setProducts(json.content)
        setTotalPages(json.totalPages)
      })
  }, [selectedCategory, sort, size, page])

  const sortAZ = () => {
    setPage(0)
    setSort("title,asc")
  }

  const sortZA = () => {
    setPage(0)
    setSort("title,desc")
  }

  const sortPriceIncreasing = () => {
    setPage(0)
    setSort("price,asc")
  }

  const sortPriceDecreasing = () => {
    setPage(0)
    setSort("price,desc")
  }

  const filterByCategory = (category) => {
    setPage(0)
    setSelectedCategory(category)
  }

  const changeSize = (newSize) => {
    setPage(0)
    setSize(newSize)
  }

  const addToCart = (product) => {
    const cartLS = JSON.parse(localStorage.getItem("cart")) || []
    cartLS.push(product)
    localStorage.setItem("cart", JSON.stringify(cartLS))
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-xl font-semibold">React Storefront</h1>

      <div className="flex flex-wrap gap-2">
        <Button onClick={sortAZ} variant="outline">A-Z</Button>
        <Button onClick={sortZA} variant="outline">Z-A</Button>
        <Button onClick={sortPriceIncreasing} variant="outline">Price <ArrowUp /></Button>
        <Button onClick={sortPriceDecreasing} variant="outline">Price <ArrowDown> </ArrowDown></Button>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="category-filter">Choose category</label>
        <select onChange={(e) => filterByCategory(e.target.value)}>
          <option value="all">All</option>
          {categories.map(category =>
            <option key={category.id} value={category.name}>{category.name}</option>
          )}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="size-filter">Choose size</label>
        <select value={size} onChange={(e) => changeSize(e.target.value)}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </div>

      <div>{products.length} items currently on this page.</div>

      {products.map((product, index) =>
        <div key={product.id} className="grid w-full grid-cols-[2rem_100px_minmax(0,1fr)_auto] items-center gap-4 py-8">
          <div className="text-right">{page * size + index + 1}.</div>
          <img className="w-[100px] h-[100px] object-cover" src={product.image} alt={product.description} />
          <div className="min-w-0">
            <div>{product.title}</div>
            <div>{product.price}€</div>
          </div>
          <div className="justify-self-end flex gap-2">
            <Button asChild variant="outline">
              <Link to={`/product/${product.id}`}>
                View product
              </Link>
            </Button>
            <Button size="icon"
              onClick={() => {
                addToCart(product)
                toast("Product has been added to the cart.", {
                  icon: <Check className="h-4 w-4" />,
                })
              }}
            >
              <ShoppingBag />
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Previous
        </Button>

        <div>Page {page + 1} / {totalPages === 0 ? 1 : totalPages}</div>

        <Button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>

      <Toaster position="top-center" />
    </div>
  )
}

export default Home