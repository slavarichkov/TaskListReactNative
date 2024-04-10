/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Dimensions, FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useSelector } from 'react-redux';
import { useTaskLogic } from './logic/taskListLogic';
import { TaskType } from '../../models/TaskModel';
import HeaderListTasks from './components/flatList/HeaderListTasks/HeaderListTasks';
import ItemListTasks from './components/flatList/ItemListTasks/ItemListTasks';
import FormAddOrUpdate from './components/forms/FormAddOrUpdate';
import Loader from '../../commonComponents/loaders/Loader';

const TaskListScreen = () => {
  const { colorText, backgroundColor } = useTheme();
  const showingTasks = useSelector((state) => state.tasks.showingTasks);

  const {
    isOpenededFormAddTasks,
    updatingItem,
    isImportantTasks,
    isLoading,
    handleClickUpdate,
    handleCkickRemove,
    openFormUpdateOrAddTasks,
    closeFormAddOrUpdateTasks,
    createTasks,
    updateTasks,
    handleCkickDone,
    controlFiltrerImportant,
    fetchTasks,
  } = useTaskLogic();

  // Компоненты FlatList
  const ItemSeparator = () => <View style={styles.separator} />;

  const HeaderList = () => {
    return (
      <HeaderListTasks
        openForm={openFormUpdateOrAddTasks}
        isFiltredImportants={isImportantTasks}
        setIsFiltredImportants={controlFiltrerImportant}
      />
    );
  };

  const ItemList: ListRenderItem<TaskType> = ({ item }) => {
    return (
      <ItemListTasks
        item={item}
        handleClickUpdate={handleClickUpdate}
        handleClickRemove={handleCkickRemove}
        handleClickDone={handleCkickDone}
        colorText={colorText}
      />
    );
  };

  const FooterList = () => {
    return <View style={{ paddingBottom: 170 }} />;
  };

  return (
    <View style={[styles.container, backgroundColor]}>
      <FlatList
        data={showingTasks}
        renderItem={ItemList}
        keyExtractor={item => item._id}
        style={styles.flatList}
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        ListHeaderComponent={HeaderList}
        ListFooterComponent={FooterList}
        ListEmptyComponent={isLoading === "isInitLoading" ? <Loader /> : <></>}
        ItemSeparatorComponent={ItemSeparator}
        refreshing={isLoading === "isRereshing"}
        onRefresh={fetchTasks}
      />
      {isOpenededFormAddTasks && (
        <FormAddOrUpdate
          isVisible={isOpenededFormAddTasks}
          handleSubmitAdd={createTasks}
          handleSubmitUpdate={updateTasks}
          handleCloseForm={closeFormAddOrUpdateTasks}
          isSubmitLoading={isLoading === "isSubmitLoading"}
          updatingTask={updatingItem}
        />
      )}
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 30,
  },
  flatList: {
    flex: 1,
    width: screenWidth,
  },
});

export default TaskListScreen;
