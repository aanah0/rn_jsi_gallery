import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {ListRenderItem, View, ViewToken} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {sharedStyles} from '../../../../assets/styles';
import SectionHeader from './SectionHeader';
import SectionItem from './SectionItem';
import dayjs from 'dayjs';

interface Props {
  activeDate: Date;
  setActiveDate: Dispatch<SetStateAction<Date>>;
}

type EventsListItem = {
  title: string;
  data: Array<EventListDataItem>;
};

type EventsList = Array<EventsListItem>;

interface EventListDataItem {
  date: Date;
  content: null;
}

const EventsList: FC<Props> = ({activeDate, setActiveDate}) => {
  const firstVisibleItem = useRef<Date>(new Date());
  const sectionList = useRef<FlatList>(null);

  const _data = useMemo<EventsList>(() => {
    const array: EventsList = [];
    const today = new Date();
    for (let index = 0; index < 100; index++) {
      const date = dayjs(today).add(index, 'day');
      array.push({
        title: date.format('dddd DD MMM YYYY'),
        data: [{date: date.toDate(), content: null}],
      });
    }
    return array;
  }, []);

  useEffect(() => {
    // if (activeDate !== firstVisibleItem.current) {
    //   sectionList.current?.scrollToLocation({
    //     sectionIndex: _data.findIndex(
    //       _dataItem =>
    //         _dataItem.data[0].date.toISOString() === activeDate.toISOString(),
    //     ),
    //     itemIndex: 0,
    //   });
    // }
  }, [_data, activeDate]);

  const onViewableItemsChanged = useCallback(
    (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      const _firstVisibleItem = info.viewableItems[0]?.item;
      if (_firstVisibleItem?.data?.[0]?.date) {
        setActiveDate(_firstVisibleItem?.data?.[0]?.date);
        firstVisibleItem.current = _firstVisibleItem?.data?.[0]?.date;
      }
    },
    [setActiveDate],
  );

  const renderItem = useCallback<ListRenderItem<any>>(({item}) => {
    return (
      <>
        <SectionHeader title={item.title} />
        <SectionItem data={null} />
      </>
    );
  }, []);

  return (
    <View style={sharedStyles.flex1}>
      <FlatList
        ref={sectionList}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        scrollEventThrottle={16}
        data={_data}
        keyExtractor={(item, index) => {
          return `${item?.date?.toISOString?.() || 0}` + index;
        }}
        renderItem={renderItem}
        viewabilityConfig={{
          minimumViewTime: 1,
          viewAreaCoveragePercentThreshold: 1,
          waitForInteraction: false,
        }}
      />
    </View>
  );
};

export default EventsList;
