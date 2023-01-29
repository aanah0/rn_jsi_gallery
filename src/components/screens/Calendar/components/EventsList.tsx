import dayjs from 'dayjs';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {SectionList, View, ViewToken} from 'react-native';
import {sharedStyles} from '../../../../assets/styles';
import SectionHeader from './SectionHeader';
import SectionItem from './SectionItem';

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
  const sectionList = useRef<SectionList>(null);

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
    if (activeDate !== firstVisibleItem.current) {
      sectionList.current?.scrollToLocation({
        sectionIndex: _data.findIndex(
          _dataItem =>
            _dataItem.data[0].date.toISOString() === activeDate.toISOString(),
        ),
        itemIndex: 0,
      });
    }
  }, [_data, activeDate]);

  const onViewableItemsChanged = useCallback(
    (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      const _firstVisibleItem = info.viewableItems[0]?.item;
      if (_firstVisibleItem?.date) {
        setActiveDate(_firstVisibleItem.date);
        firstVisibleItem.current = _firstVisibleItem.date;
      }
    },
    [setActiveDate],
  );

  const renderItem = useCallback(() => <SectionItem data={null} />, []);
  const renderSectionHeader = useCallback(
    (info: any) => <SectionHeader title={info.section.title} />,
    [],
  );

  return (
    <View style={sharedStyles.flex1}>
      <SectionList
        ref={sectionList}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        scrollEventThrottle={16}
        sections={_data}
        keyExtractor={(item, index) => {
          return `${item?.date?.toISOString?.() || 0}` + index;
        }}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

export default EventsList;
