/**
 * "Visual Paradigm: DO NOT MODIFY THIS FILE!"
 * 
 * This is an automatic generated file. It will be regenerated every time 
 * you generate persistence class.
 * 
 * Modifying its content may cause the program not work, or your work may lost.
 */

/**
 * Licensee: mariana(Universidade do Minho)
 * License Type: Academic
 */
package data.movieverse;

public class Achievement {
	public Achievement() {
	}
	
	private void this_setOwner(Object owner, int key) {
		if (key == ORMConstants.KEY_ACHIEVEMENT_MUSER) {
			this.mUser = (data.movieverse.MUser) owner;
		}
		
		else if (key == ORMConstants.KEY_ACHIEVEMENT_BADGE) {
			this.badge = (data.movieverse.Badge) owner;
		}
	}
	
	org.orm.util.ORMAdapter _ormAdapter = new org.orm.util.AbstractORMAdapter() {
		public void setOwner(Object owner, int key) {
			this_setOwner(owner, key);
		}
		
	};
	
	private int id;
	
	private java.util.Date date;
	
	private data.movieverse.Badge badge;
	
	private data.movieverse.MUser mUser;
	
	public void setDate(java.util.Date value) {
		this.date = value;
	}
	
	public java.util.Date getDate() {
		return date;
	}
	
	private void setId(int value) {
		this.id = value;
	}
	
	public int getId() {
		return id;
	}
	
	public int getORMID() {
		return getId();
	}
	
	public void setmUser(data.movieverse.MUser value) {
		if (mUser != null) {
			mUser.achievements.remove(this);
		}
		if (value != null) {
			value.achievements.add(this);
		}
	}
	
	public data.movieverse.MUser getmUser() {
		return mUser;
	}
	
	/**
	 * This method is for internal use only.
	 */
	public void setORM_mUser(data.movieverse.MUser value) {
		this.mUser = value;
	}
	
	private data.movieverse.MUser getORM_mUser() {
		return mUser;
	}
	
	public void setBadge(data.movieverse.Badge value) {
		if (badge != null) {
			badge.achievements.remove(this);
		}
		if (value != null) {
			value.achievements.add(this);
		}
	}
	
	public data.movieverse.Badge getBadge() {
		return badge;
	}
	
	/**
	 * This method is for internal use only.
	 */
	public void setORM_Badge(data.movieverse.Badge value) {
		this.badge = value;
	}
	
	private data.movieverse.Badge getORM_Badge() {
		return badge;
	}
	
	public String toString() {
		return String.valueOf(getId());
	}
	
}