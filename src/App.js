import { Card, Image, Input, List, Space, Typography } from "antd";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`https://dummyjson.com/products/search?q=${searchText}`)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false)
        setDataSource(response.products);
      });
  }, [searchText]);

  return (
    <Space style={{ padding: "0px 12px" }} direction="vertical">
      <Typography.Title
        style={{ textAlign: "center", fontFamily: "monospace" }}
      >
        Images||Gallery
      </Typography.Title>
      <Input.Search
        style={{ maxWidth: 500, display: "flex", margin: "auto" }}
        onSearch={(value) => {
          setSearchText(value);
        }}
      />
      <Typography.Text>Showing Results for:{searchText || "All"}</Typography.Text>
      <List
        dataSource={dataSource}
        grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
        renderItem={(item) => {
          return (
            <Card
              hoverable
              key={item.id}
              style={{ height: 300, margin: 12, overflow: "hidden" }}
            >
              <Image
                src={item.thumbnail}
                preview={{ visible: false }}
                onClick={() => {
                  setPreviewImages(item.images);
                }}
              />
            </Card>
          );
        }}
      ></List>
      {previewImages.length > 0 ? (
        <Image.PreviewGroup
          preview={{
            visible: previewImages.length,
            onVisibleChange: (value) => {
              if (!value) {
                setPreviewImages([]);
              }
            },
          }}
        >
          {previewImages.map((image) => {
            return <Image src={image} />;
          })}
        </Image.PreviewGroup>
      ) : null}
    </Space>
  );
}

export default App;
