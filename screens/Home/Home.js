import { serialize } from "jest-serializer";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  DrawerLayoutAndroidBase,
} from "react-native";
import { FilterModal } from "../";
import { HorizontalFoodCart, VerticalFoodCart } from "../../components";

import { FONTS, SIZES, COLORS, icons, dummyData } from "../../constants";

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      {/* Header  */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>Show All</Text>
        </TouchableOpacity>
      </View>
      {/* Children  */}
      {children}
    </View>
  );
};
const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  const [menuList, setMenuList] = React.useState([]);
  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const [recommend, setRecommend] = React.useState([]);
  const [popular, setPopular] = React.useState([]);

  React.useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  //handler
  function handleChangeCategory(categoryId, MenuTypeId) {
    //Retrieve the popular Menu
    let selectedPopular = dummyData?.menu.find((a) => a.name == "Popular");
    //Retrieve the recommende menu
    let selectedRecommended = dummyData.menu.find(
      (a) => a.name == "Recommended"
    );
    //Fine the menu based on the memnutypeId
    let selectedmenu = dummyData.menu.find((a) => a.id == MenuTypeId);
    //Set the Popular Menu based in the CategoryId
    setPopular(
      selectedPopular?.list.filter((a) => a.categories.includes(categoryId))
    );
    //Set the recommended menu based on the categoryId
    setRecommend(
      selectedRecommended?.list.filter((a) => a.categories.includes(categoryId))
    );
    //set the manu based on the categoryId
    setMenuList(
      selectedmenu?.list.filter((a) => a.categories.includes(categoryId))
    );
  }

  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray1,
        }}
      >
        {/* Icons  */}
        <Image
          source={icons.search}
          style={{ height: 20, width: 20, tintColor: COLORS.black }}
        ></Image>

        {/* Text input  */}
        <TextInput
          style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.body }}
          placeholder="Searh Food ..."
        />

        {/* Filter Button  */}

        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Image
            source={icons.filter}
            style={{ height: 20, width: 20, tintColor: COLORS.black }}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  }

  function renderDeliveryTo() {
    return (
      <View
        style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding }}
      >
        <Text style={{ color: COLORS.primary }}>DELIVERY TO</Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.h3 }}>{dummyData?.myProfile?.address}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderFoodCategories() {
    return (
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 55,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginTop: SIZES.padding,
              marginRight:
                index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor:
                selectedCategoryId == item.id
                  ? COLORS.primary
                  : COLORS.lightGray2,
            }}
            onPress={() => {
              setSelectedCategoryId(item.id);
              handleChangeCategory(item.id, selectedMenuType);
            }}
          >
            <Image
              source={item.icon}
              style={{ width: 50, height: 50, marginTop: 5 }}
            ></Image>
            <Text
              style={{
                alignSelf: "center",
                marginRight: SIZES.base,
                color:
                  selectedCategoryId == item.id
                    ? COLORS.white
                    : COLORS.darkGray,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }
  function renderPopularSection() {
    return (
      <Section
        title="Popular Near You"
        onPress={() => console.log("Sow all Popuilar List")}
      >
        <FlatList
          data={popular}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <VerticalFoodCart
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : 18,
                marginRight: index == popular.length - 1 ? SIZES.padding : 0,
              }}
              item={item}
              onPress={() => {
                console.log("Vertical Food Cart");
              }}
            />
          )}
        />
      </Section>
    );
  }

  function renderRecommendedSection() {
    return (
      <Section
        title="Recommended"
        onPress={() => console.log("Show All Recommended")}
      >
        <FlatList
          data={recommend}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <HorizontalFoodCart
              containerStyle={{
                height: 180,
                width: SIZES.width * 0.85,
                marginLeft: index == 0 ? SIZES.padding : 18,
                marginRight: index == recommend.length - 1 ? SIZES.padding : 0,
                paddingHorizontal: SIZES.radius,
                alignItems: "center",
              }}
              imageStyle={{
                marginTop: 35,
                height: 150,
                width: 150,
              }}
              item={item}
              onPress={() => {
                console.log("Horizontal Food Cart");
              }}
            />
          )}
        />
      </Section>
    );
  }
  function renderMenuTypes() {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 20,
          marginBottom: 20,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginLeft: SIZES.padding,
              marginRight:
                index == dummyData.menu.length - 1 ? SIZES.padding : 0,
            }}
            onPress={() => {
              setSelectedMenuType(item.id);
              handleChangeCategory(selectedCategoryId, item.id);
            }}
          >
            <Text
              style={{
                color:
                  selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Search  */}
      {renderSearch()}

      {/* Filter Model  */}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {/* List Section  */}
      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Delivery TO Section  */}
            {renderDeliveryTo()}
            {/* Food Categories */}
            {renderFoodCategories()}
            {/* Popular Section  */}
            {renderPopularSection()}
            {/* Recommende  */}
            {renderRecommendedSection()}
            {/* Menu Type */}
            {renderMenuTypes()}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <HorizontalFoodCart
              containerStyle={{
                height: 130,
                alignItems: "center",
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
              imageStyle={{
                marginTop: 20,
                height: 110,
                width: 110,
              }}
              item={item}
              onPress={() => console.log("Horizontal FodCard")}
            />
          );
        }}
        ListFooterComponent={<View style={{ height: 200 }}></View>}
      />
    </View>
  );
};

export default Home;
