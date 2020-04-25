import { gql } from '@apollo/client';

export const Query = {
	searchContentQuery: gql`
		query($mode: String!) {
			searchContent(mode: $mode) {
				resources {
					secure_url
					bytes
					filename
					folder
					created_at
					version
					resource_type
				}
			}
		}
	`,
	FolderQuery: gql`
		query {
			getFolders {
				id
				name
				createdAt
				size
			}
		}
	`,
	getFolderContent: gql`
		query($folder: String!) {
			searchImagesInFolder(folder: $folder) {
				resources {
					bytes
					created_at
					filename
					folder
					resource_type
					secure_url
				}
			}
		}
	`,
};
