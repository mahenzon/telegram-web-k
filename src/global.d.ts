import type ListenerSetter from './helpers/listenerSetter';
import type {Middleware, MiddlewareHelper} from './helpers/middleware';
import type {Chat, Document, User} from './layer';

declare global {
  interface AddEventListenerOptions extends EventListenerOptions {
    once?: boolean;
    passive?: boolean;
    // ls?: ListenerSetter;
  }

  interface HTMLCanvasElement {
    dpr?: number
  }

  interface HTMLElement {
    middlewareHelper?: MiddlewareHelper;
    // middleware?: Middleware;
  }

  // typescript is lack of types
  interface Selection {
    modify(alter: 'move' | 'extend', direction: 'forward' | 'backward' | 'left' | 'right', granularity: 'character' | 'word' | 'sentence' | 'line' | 'paragraph' | 'lineboundary' | 'sentenceboundary' | 'paragraphboundary' | 'documentboundary'): void;
  }

  type UserId = User.user['id'];
  type ChatId = Chat.chat['id'];
  // type PeerId = `u${UserId}` | `c${ChatId}`;
  // type PeerId = `${UserId}` | `-${ChatId}`;
  type PeerId = number;
  // type PeerId = number;
  type BotId = UserId;
  type DocId = Document.document['id'];
  type Long = string | number;
  type MTLong = string;

  type AppEmoji = {emoji: string, docId?: DocId};

  type MTMimeType = 'video/quicktime' | 'image/gif' | 'image/jpeg' | 'application/pdf' |
    'video/mp4' | 'image/webp' | 'audio/mpeg' | 'audio/ogg' | 'application/octet-stream' |
    'application/x-tgsticker' | 'video/webm' | 'image/svg+xml' | 'image/png' | 'application/json' |
    'application/x-tgwallpattern' | 'audio/wav';

  type MTFileExtension = 'mov' | 'gif' | 'pdf' | 'jpg' | 'jpeg' | 'wav' |
    'tgv' | 'tgs' | 'svg' | 'mp4' | 'webm' | 'webp' | 'mp3' | 'ogg' | 'json' | 'png';

  type ApiFileManagerError = 'DOWNLOAD_CANCELED' | 'UPLOAD_CANCELED' | 'FILE_TOO_BIG' | 'REFERENCE_IS_NOT_REFRESHED';
  type StorageError = 'STORAGE_OFFLINE' | 'NO_ENTRY_FOUND' | 'IDB_CREATE_TIMEOUT';
  type ReferenceError = 'NO_NEW_CONTEXT';
  type NetworkerError = 'NETWORK_BAD_RESPONSE';
  type FiltersError = 'PINNED_DIALOGS_TOO_MUCH';

  type LocalFileError = ApiFileManagerError | ReferenceError | StorageError;
  type LocalErrorType = LocalFileError | NetworkerError | FiltersError | 'UNKNOWN' | 'NO_DOC' | 'MIDDLEWARE' | 'PORT_DISCONNECTED';

  type ServerErrorType = 'FILE_REFERENCE_EXPIRED' | 'SESSION_REVOKED' | 'AUTH_KEY_DUPLICATED' |
    'SESSION_PASSWORD_NEEDED' | 'CONNECTION_NOT_INITED' | 'ERROR_EMPTY' | 'MTPROTO_CLUSTER_INVALID' |
    'BOT_PRECHECKOUT_TIMEOUT' | 'TMP_PASSWORD_INVALID' | 'PASSWORD_HASH_INVALID' | 'CHANNEL_PRIVATE' |
    'VOICE_MESSAGES_FORBIDDEN' | 'PHOTO_INVALID_DIMENSIONS' | 'PHOTO_SAVE_FILE_INVALID' |
    'USER_ALREADY_PARTICIPANT';

  type ErrorType = LocalErrorType | ServerErrorType;

  interface Error {
    type?: ErrorType;
  }

  type ApiError = Partial<{
    code: number,
    type: ErrorType,
    description: string,
    originalError: any,
    stack: string,
    handled: boolean,
    input: string,
    message: ApiError
  }>;

  declare const electronHelpers: {
    openExternal(url): void;
  } | undefined;

  type DOMRectMinified = {top: number, right: number, bottom: number, left: number};
}
