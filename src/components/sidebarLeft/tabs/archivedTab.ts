/*
 * https://github.com/morethanwords/tweb
 * Copyright (C) 2019-2021 Eduard Kuzmenko
 * https://github.com/morethanwords/tweb/blob/master/LICENSE
 */

import appDialogsManager from '../../../lib/appManagers/appDialogsManager';
import {SliderSuperTab} from '../../slider';
import {FOLDER_ID_ARCHIVE, REAL_FOLDER_ID} from '../../../lib/mtproto/mtproto_config';

export default class AppArchivedTab extends SliderSuperTab {
  private static filterId: REAL_FOLDER_ID = FOLDER_ID_ARCHIVE;
  private wasFilterId: number;

  public init() {
    this.wasFilterId = appDialogsManager.filterId;

    this.container.id = 'chats-archived-container';
    this.setTitle('ArchivedChats');

    if(!appDialogsManager.sortedLists[AppArchivedTab.filterId]) {
      const chatList = appDialogsManager.createChatList();
      const scrollable = appDialogsManager.generateScrollable(chatList, {
        title: undefined,
        id: AppArchivedTab.filterId,
        localId: FOLDER_ID_ARCHIVE
      });
      scrollable.container.append(chatList);
      appDialogsManager.setListClickListener(chatList, null, true);
      // appDialogsManager.setListClickListener(archivedChatList, null, true); // * to test peer changing
    }

    const scrollable = appDialogsManager.scrollables[AppArchivedTab.filterId];
    this.scrollable.container.replaceWith(scrollable.container);
    // ! DO NOT UNCOMMENT NEXT LINE - chats will stop loading on scroll after closing the tab
    // this.scrollable = scrollable;
    return appDialogsManager.setFilterIdAndChangeTab(AppArchivedTab.filterId).then(({cached, renderPromise}) => {
      if(cached) {
        return renderPromise;
      }
    });
  }

  // вообще, так делать нельзя, но нет времени чтобы переделать главный чатлист на слайд...
  onOpenAfterTimeout() {
    appDialogsManager.sortedLists[this.wasFilterId].clear();
  }

  onClose() {
    appDialogsManager.setFilterIdAndChangeTab(this.wasFilterId);
  }

  onCloseAfterTimeout() {
    appDialogsManager.sortedLists[AppArchivedTab.filterId].clear();
    return super.onCloseAfterTimeout();
  }
}
